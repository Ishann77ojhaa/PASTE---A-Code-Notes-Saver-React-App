import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-7 py-3 flex items-center justify-between">
        
        <div className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={()=>navigate("/")}>
          Pastify
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative transition-all duration-300 ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }
              after:content-[''] after:absolute after:left-0 after:-bottom-1
              after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300
              ${
                isActive
                  ? "after:w-full"
                  : "after:w-0 hover:after:w-full"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `relative transition-all duration-300 ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }
              after:content-[''] after:absolute after:left-0 after:-bottom-1
              after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300
              ${
                isActive
                  ? "after:w-full"
                  : "after:w-0 hover:after:w-full"
              }`
            }
          >
             My Pastes
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;