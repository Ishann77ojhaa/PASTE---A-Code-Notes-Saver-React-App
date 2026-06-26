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
   className="p-1 rounded-2xl mt-2 w-[66%] pl-5"
   type="text"
   placeholder="Enter Title here"
   value={title}
   onChange={(e) => setTitle(e.target.value)}
   />

   <button onClick={createPaste}>
    {
      pasteId ? "Update Paste" : "Create My Paste"
    }
  </button>
    </div>
    <div className="mt-8">
      <textarea className="p-4 rounded-2xl mt-4 min-w-125"
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