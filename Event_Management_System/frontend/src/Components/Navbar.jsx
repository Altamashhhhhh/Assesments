import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { isLogged , role  } = useSelector((state) => state.user);
  const links = useMemo(()=>{
    if(role === "admin"){
      return [
        { to: "/", text: "Home" },
        { to: "/events", text: "Events" },
        { to: "/add-event", text: "Add Events" },
        { to: "/my-event", text: "My Events" },
      ];
    }
    if(role === "user"){
      return [
        { to: "/", text: "Home" },
        { to: "/events", text: "Events" }, 
        { to: "/my-event", text: "My Events" },
      ];
    }
    return []
  },[ role ])

  return isLogged ? (
    <div className="w-full h-20 font-serif border-b-1 border-gray-300">
      <div className="w-1/2 mx-auto h-full flex justify-between items-center">
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
        <button className="p-3 rounded-sm bg-red-400 text-white hover:bg-red-700">Log Out</button>
      </div>
    </div>
  ) : null;
};

export default Navbar;
