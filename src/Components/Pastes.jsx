import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../Redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId){
    dispatch(removeFromPaste(pasteId));
  }

  return(
     <div> 
     <input
       className="p-2 rounded-2xl w-full max-w-2xl mt-5" 
      type="search"
      placeholder="Search here"
      value={searchTerm}
      onChange={(e)=> setSearchTerm(e.target.value)}    
     />

    <div className="flex flex-col gap-5 mt-5">
  {filterData.length > 0 &&
  filterData.map((paste) => (
    <div className="border p-4 rounded-lg" key={paste?._id}>
      <div className="text-xl font-bold">
        {paste.title}
      </div>

      <div className="mt-2 whitespace-pre-wrap">
        {paste.content}
      </div>

      <div className="flex flex-wrap gap-3 mt-4">

        <Link to={`/?pasteId=${paste?._id}`}>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
            Edit
          </button>
        </Link>

        <Link to={`/pastes/${paste?._id}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            View
          </button>
        </Link>

        <button
          onClick={() => handleDelete(paste?._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(paste?.content);
            toast.success("Copied to Clipboard");
          }}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
        >
          Copy
        </button>

        <button
          onClick={() => {
            const url = `${window.location.origin}/pastes/${paste?._id}`;
            navigator.clipboard.writeText(url);
            toast.success("Share link copied!");
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Share
        </button>

      </div>
    </div>
  ))}
</div>
</div>
);
};

export default Pastes;
