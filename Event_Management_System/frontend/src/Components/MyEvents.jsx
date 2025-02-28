import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEnrollmentsAction } from "../redux/actions/enrollAction";

const MyEvents = () => {
  const { isLogged, token, currentUser   } = useSelector((state) => state.user);
  const { data , error , status  } = useSelector((state) => state.enroll);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
    dispatch(fetchEnrollmentsAction({ token, userId: currentUser._id }));
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
        {data?.map((event, index) => (
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

         
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
