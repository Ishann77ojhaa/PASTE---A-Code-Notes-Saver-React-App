import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../Redux/pasteSlice";
import toast from "react-hot-toast";

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
    filterData.map((paste) => {
      return (
        <div className="border" key={paste?._id}>
          <div>
            {paste.title}
          </div>

          <div>
            {paste.content}
          </div>

          <div className="flex flex-row place-content-evenly">
            <button>Edit</button>

            <button>View</button>

            <button onClick={() => handleDelete(paste?._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">
              Delete
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(paste?.content);
                toast.success("Copied to Clipboard");
              }}
            >
              Copy
            </button>

            <button>Share</button>
          </div>

          <div>
            {paste.createdAt}
          </div>
        </div>
      );
    })}
</div>
</div>
);
};

export default Pastes;
