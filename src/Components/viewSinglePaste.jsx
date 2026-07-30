import { useState } from "react";
import { useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import { Copy, Check, Sparkles } from "lucide-react";

const ViewSinglePaste = () => {

  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!paste?.content) return;

    navigator.clipboard.writeText(paste.content);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (!paste) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold">
        Paste Not Found
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Title */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
          <input
            type="text"
            value={paste.title}
            disabled
            className="w-full bg-transparent text-2xl font-bold text-gray-800 outline-none"
          />
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

          {/* Toolbar */}
          <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b">

            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Content
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-100 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <textarea
              value={paste.content}
              disabled
              rows={18}
              className="w-full resize-none bg-transparent outline-none text-gray-800 font-mono leading-relaxed"
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default ViewSinglePaste;