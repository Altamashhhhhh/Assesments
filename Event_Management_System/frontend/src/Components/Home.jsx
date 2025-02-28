import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { isLogged } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged , navigate ]);

  return (
    <div className="flex flex-col justify-center items-center w-screen bg-blue-100 h-screen">
      <div className="flex flex-col items-center justify-center text-center w-9/10 md:w-1/2 lg:w-1/3 p-8 shadow-lg bg-white border border-gray-200 rounded-2xl text-gray-700">
        <h1 className="font-bold text-5xl text-blue-700 mb-2">ONE STOP</h1>
        <h1 className="font-extrabold text-6xl text-gray-800 mb-3">EVENT PLANNER</h1>
        <p className="font-light text-lg text-gray-600 italic">
          "Every event should be perfect. We make it happen!"
        </p>
        <div className="w-full flex flex-col space-y-4 mt-6">
          <p className="text-gray-700 text-lg font-medium">Discover, Organize & Manage Events with Ease</p>
          <ul className="list-disc text-gray-600 text-left w-3/4 mx-auto space-y-1 list-none">
            <li>✔ Plan your events seamlessly</li>
            <li>✔ Browse and join amazing events</li>
            <li>✔ Track your upcoming events</li>
          </ul>
        </div>
        <div className="flex w-full justify-center gap-5 mt-6">
          <Link to="/my-event">
            <button className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg text-lg shadow-md transition duration-300">
              Your Events
            </button>
          </Link>
          <Link to="/events">
            <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-lg shadow-md transition duration-300">
              Explore Events
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;