import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchEnrollmentsAction,
  unregisterEventAction,
} from "../redux/actions/enrollAction";

const MyEvents = () => {
  const { isLogged, token, currentUser } = useSelector((state) => state.user);
  let { data, error, status } = useSelector((state) => state.enroll);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [myData, setMyData] = useState([]);
  const handleUnregisterEvent = (id) => {
    dispatch(unregisterEventAction({ id, token }))
      .then((res) => {
        if (res) {
          console.log(res)
          const updatedData = myData.filter((item) => item._id !== id);
          setMyData(updatedData);
          alert("Deleted Success");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
    dispatch(fetchEnrollmentsAction({ token, userId: currentUser._id })).then(res=>{
      setMyData(res.payload)
    })
  }, [isLogged]);
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Upcoming Events
      </h1>

      {status === "loading" && (
        <p className="text-center text-lg text-blue-500">Loading events...</p>
      )}
      {error && (
        <p className="text-center text-lg text-red-500">Error: {error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {myData?.map((event, index) => (
          <div
            key={index}
            className="flex flex-col justify-around   bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition duration-300"
          >
            <img
              src={event.event?.image || "https://via.placeholder.com/300"}
              alt={event.event?.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {event.event?.title}
            </h2>

            <p className="text-gray-700 font-medium">
              📅 {new Date(event.event?.date).toLocaleDateString("en-GB")}
            </p>
            <button
              className="bg-red-700 text-white m-3 p-2 rounded-md  hover:bg-red-500 cursor-pointer"
              onClick={() => handleUnregisterEvent(event._id)}
            >
              Unregister from event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
