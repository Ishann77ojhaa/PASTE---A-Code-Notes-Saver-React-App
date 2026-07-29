import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../Redux/pasteSlice";
import { Copy, Check, Sparkles, Send } from "lucide-react";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  // Fetch all pastes to load the current paste's data if editing
  const allPastes = useSelector((state) => state.paste?.pastes || []);

  useEffect(() => {
    if (pasteId) {
      const existingPaste = allPastes.find((p) => p._id === pasteId);
      if (existingPaste) {
        setTitle(existingPaste.title || "");
        setValue(existingPaste.content || "");
      }
    } else {
      setTitle("");
      setValue("");
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    if (!title.trim() && !value.trim()) return;

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Bar: Title Input & Action Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Untitled Paste..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 font-medium text-lg outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
            />
          </div>

          <button
            onClick={createPaste}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>

        {/* Editor Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
          {/* Editor Header Toolbar */}
          <div className="flex items-center justify-between px-6 py-3 bg-gray-50/80 border-b border-gray-100">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Content Editor</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!value}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg shadow-2xs hover:bg-gray-50 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                title="Copy content"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Textarea Area */}
          <div className="p-6">
            <textarea
              value={value}
              placeholder="Write or paste your content here..."
              onChange={(e) => setValue(e.target.value)}
              rows={18}
              className="w-full font-mono text-sm sm:text-base text-gray-800 placeholder-gray-400 bg-transparent outline-none resize-none leading-relaxed selection:bg-indigo-100 selection:text-indigo-900"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;