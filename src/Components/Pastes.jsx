import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../Redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Search, Edit3, Eye, Trash2, Copy, Share2, FileText, Calendar } from "lucide-react";

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
    toast.success("Paste deleted successfully");
  }

  // Format date nicely if available
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Search Bar Header */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="search"
            placeholder="Search pastes by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 font-medium shadow-2xs outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
          />
        </div>

        {/* Pastes List */}
        <div className="space-y-4">
          {filterData.length > 0 ? (
            filterData.map((paste) => (
              <div 
                key={paste?._id}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4"
              >
                {/* Top Info & Title */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                      {paste.title || "Untitled Paste"}
                    </h3>
                    {paste.createdAt && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100 shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {formatDate(paste.createdAt)}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base line-clamp-3 font-mono bg-gray-50/70 p-3.5 rounded-xl border border-gray-100 whitespace-pre-wrap">
                    {paste.content}
                  </p>
                </div>

                {/* Actions Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link to={`/?pasteId=${paste?._id}`}>
                      <button className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-700 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors cursor-pointer">
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                    </Link>

                    <Link to={`/pastes/${paste?._id}`}>
                      <button className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer">
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copied to Clipboard");
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-purple-700 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </button>

                    <button
                      onClick={() => {
                        const url = `${window.location.origin}/pastes/${paste?._id}`;
                        navigator.clipboard.writeText(url);
                        toast.success("Share link copied!");
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Share
                    </button>
                  </div>

                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-600 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors cursor-pointer ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8 space-y-3">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No pastes found</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                {searchTerm ? "No pastes match your search query." : "You haven't created any pastes yet. Get started by making one!"}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Pastes;