import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../redux/slices/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
const Navbar = () => {
  const { isLogged, role } = useSelector((state) => state.user);
  const [hamburger, setHamburger] = useState(false);
  const dispatch = useDispatch();

  const links = useMemo(() => {
    if (role === "admin") {
      return [
        { to: "/", text: "Home" },
        { to: "/events", text: "Events" },
        { to: "/add-event", text: "Add Events" },
        { to: "/my-event", text: "My Events" },
      ];
    }
    if (role === "user") {
      return [
        { to: "/", text: "Home" },
        { to: "/events", text: "Events" },
        { to: "/my-event", text: "My Events" },
      ];
    }
    return [];
  }, [role]);

  return isLogged ? (
    <>
      <div className="max-[600px]:hidden w-full h-20 font-serif border-b border-gray-300">
        <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] mx-auto h-full flex justify-between items-center">
          {links?.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-blue-400 p-3 rounded-sm"
                  : "text-gray-700 hover:text-blue-300"
              }
            >
              {link.text}
            </NavLink>
          ))}
          <button
            onClick={() => dispatch(logout())}
            className="p-3 rounded-sm bg-red-400 text-white hover:bg-red-700"
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="hidden max-[600px]:block text-3xl m-5 cursor-pointer">
        <div className="flex w-full px-5 justify-between">
          <FontAwesomeIcon
            className="transition-transform duration-300 ease-in-out"
            onClick={() => setHamburger((prev) => !prev)}
            icon={faBars}
          />
          <motion.h1
            className="font-bold text-3xl text-blue-700 relative 
                 shadow-md px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 
                 text-white rounded-lg tracking-wider"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            EMS
          </motion.h1>
        </div>

        <div
          className={`flex flex-col transition-all duration-300 ease-in-out transform ${
            hamburger
              ? "opacity-100 scale-100 max-h-[500px]"
              : "opacity-0 scale-95 max-h-0 overflow-hidden"
          }`}
        >
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className="text-lg my-2 border-b p-1 hover:bg-black hover:text-white transition-all duration-300"
            >
              {link.text}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  ) : null;
};

export default Navbar;
