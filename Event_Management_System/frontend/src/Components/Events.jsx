import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "../redux/actions/eventAction";
import {
  enrollEventAction,
  fetchEnrolledUsersAction,
} from "../redux/actions/enrollAction";
import { resetError, resetStatus } from "../redux/slices/enrollSlice";

const Events = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceRef = useRef(null);
  const { data, error, status, pagination } = useSelector(
    (state) => state.event
  );
  const {
    error: enrollError,
    status: enrollStatus,
    enrolled,
  } = useSelector((state) => state.enroll);
  const { isLogged, token, currentUser, role } = useSelector(
    (state) => state.user
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnrollment = (event) => {
    const enrollData = { user: currentUser._id, event };
    dispatch(enrollEventAction({ enrollData, token }));
  };

  const handleAttendeesList = (eventId) => {
    dispatch(fetchEnrolledUsersAction({ eventId, token }));
    setIsModalOpen(true);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      dispatch(fetchEvents({ token, page ,  search: e.target.value }));
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
    dispatch(fetchEvents({ token, page , search }));
  }, [isLogged, navigate, page , search]);

  useEffect(() => {
    if (enrollStatus === "Enrollment Failed") {
      alert(enrollError);
      dispatch(resetError());
    }
    if (enrollStatus === "Enrollment Completed") {
      alert("✅ Event registration successful!");
      dispatch(resetStatus());
    }
  }, [enrollStatus, enrollError]);

  return (
    <>
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

        <input
          type="text"
          placeholder="Search events..."
          className="w-8/10 p-3 m-2 mx-auto block border  border-gray-700 rounded-md focus:ring focus:ring-blue-400 outline-none focus:border-none"
          value={search}
          onChange={handleSearch}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data?.map((event, index) => (
            <div
              key={index}
              className="flex flex-col justify-around bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition duration-300"
            >
              <img
                src={event.image || "https://via.placeholder.com/300"}
                alt={event.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {event.title}
              </h2>
              <p className="text-gray-600 text-sm mb-2">{event.description}</p>
              <p className="text-gray-700 font-medium">📍 {event.location}</p>
              <p className="text-gray-700 font-medium">
                📅 {new Date(event.date).toLocaleDateString("en-GB")}
              </p>

              <button
                onClick={() => handleEnrollment(event._id)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 mt-4 w-full rounded-md transition duration-300"
              >
                Register for this Event
              </button>

              {role === "admin" && (
                <button
                  onClick={() => handleAttendeesList(event._id)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 mt-4 w-full rounded-md transition duration-300"
                >
                  See all attendees
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 my-10">
          {/* Prev Button */}
          <button
            className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg shadow-lg 
               hover:bg-gray-800 transition duration-300 
               disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
          >
            ← Prev
          </button>

          <h3
            className="text-xl font-bold text-gray-800 bg-white border border-gray-300 
                px-6 py-3 rounded-md shadow-md"
          >
            {page}
          </h3>

          <button
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg 
               hover:bg-blue-700 transition duration-300 
               disabled:bg-blue-400 disabled:cursor-not-allowed"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === pagination.totalPages}
          >
            Next →
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className=" min-w-screen fixed inset-0 flex items-center justify-center bg-white">
          <div className="min-w-1/2 bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Enrolled Attendees
            </h2>

            {enrolled && enrolled.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">#</th>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolled.map((user, index) => (
                    <tr key={user._id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600">
                No attendees found for this event.
              </p>
            )}

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Events;
