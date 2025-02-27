import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const AddEvent = () => {
  

  const {isLogged} = useSelector(state => state.user)
  const navigate = useNavigate()

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
    location: "",
  });

  useEffect(()=>{
    if(!isLogged){
      navigate("/login")
    }
  },[isLogged])
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form className=" flex justify-around items-center flex-col w-full h-fit max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-blue-400">CREATE EVENT</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          type="text"
          name="description"
          rows={5}
          placeholder="Description"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
        <input
          type="url"
          name="image"
          placeholder="Image URL (leave blank if not applicable)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          name="date"
          placeholder="Date"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
