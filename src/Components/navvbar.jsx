import { NavLink, useNavigate } from "react-router-dom";

const Navvbar = () => {
  const navigate = useNavigate();

  // Helper function to keep active link styling DRY and clean
  const navLinkClass = ({ isActive }) =>
    `relative font-medium transition-colors duration-200 py-1 ${
      isActive ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"
    } after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-indigo-600 after:transition-all after:duration-300 ${
      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200 transition-transform duration-300 group-hover:scale-105">
            P
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:text-indigo-600 transition-colors duration-200">
            Pastify
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 sm:gap-8 text-base">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/pastes" className={navLinkClass}>
            My Pastes
          </NavLink>
        </nav>

      </div>
    </header>
  );
};

export default Navvbar;