import { createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import Pastes from "./Components/Pastes";

import ViewSinglePaste from "./Components/ViewSinglePaste";
import Navvbar from "./Components/Navvbar";


const router = createBrowserRouter([
  {
    path: "/",
    element: <div> 
      <Navvbar/>
      <Home/>
    </div>
  },
  {
    path: "/pastes",
    element: <div>
     <Navvbar/>
    <Pastes/>
    </div>
  },
  {
    path: "/pastes/:id",
    element: <div> 
       <Navvbar/>
      <ViewSinglePaste/>
    </div>
  }
]);

export default router;