import { createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import Pastes from "./Components/Pastes";
import Navvbar from "./Components/navvbar";
import ViewSinglePaste from "./Components/ViewSinglePaste";


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