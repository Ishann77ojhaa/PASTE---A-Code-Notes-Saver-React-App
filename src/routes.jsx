import { createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import Pastes from "./Components/Pastes";
import Navbar from "./Components/Navbar";


const router = createBrowserRouter([
  {
    path: "/",
    element: <div> 
      <Navbar/>
      <Home/>
    </div>
  },
  {
    path: "/pastes",
    element: <div>
    <Navbar/>
    <Pastes/>
    </div>
  },
  {
    path: "/pastes/:id",
    element: <div> 
      <Navbar/>
    </div>
  }
]);

export default router;