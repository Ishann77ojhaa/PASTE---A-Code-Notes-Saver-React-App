import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return(
     <div> 
     <input
       className="p-2 rounded-2xl min-w-150 mt-5" 
      type="search"
      placeholder="Search here"
      value={searchTerm}
      onChange={(e)=> setSearchTerm(e.target.value)}    
     />

     <div className="flex flex-col gap-5 mt-5">
      {filterData.length > 0 && 
        filterData.map((paste) => (
           <div key={paste.id} className="border">
              {paste.title}
            </div>
        ))}
      </div>
    </div>
  );
};

export default Pastes;
