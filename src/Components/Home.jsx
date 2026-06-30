import { useState } from "react"
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../Redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();


function createPaste(){
  const paste ={
    title : title,
    content : value,
    _id: pasteId ||
    Date.now().toString(36),
    createdAt: new Date().toISOString()
  }

  if(pasteId){
    //update
    dispatch(updateToPaste(paste));
  }
  else{
    //create
     dispatch(addToPaste(paste));
  }

//After Creation or updation
   setTitle('');
   setValue('');
   setSearchParams({});

}
  return (
<div>
<div className="flex flex-row gap-7 place-content-between">

  <input 
   className="w-full max-w-3xl mt-3 px-5 py-3 border border-gray-300 rounded-xl bg-white text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 shadow-sm"
   type="text"
   placeholder="Enter Title here"
   value={title}
   onChange={(e) => setTitle(e.target.value)}
   />

   <button onClick={createPaste}
    className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg active:scale-95 transition-all duration-200"
   >
    {
      pasteId ? "Update Paste" : "Create My Paste"
    }
  </button>
    </div>
    <div className="mt-8">
      <textarea className="w-full max-w-3xl px-5 py-4 border border-gray-300 rounded-xl bg-white text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 shadow-sm resize-none"
       value = {value}
       placeholder="Enter Content"
       onChange={(e) => setValue(e.target.value)}
       rows = {20}
      />
    </div>
  </div>
  )
}

export default Home