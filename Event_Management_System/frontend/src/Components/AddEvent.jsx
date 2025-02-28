import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEventAction } from "../redux/actions/eventAction";

const AddEvent = () => {
  const dispatch = useDispatch();
  const { isLogged, token } = useSelector((state) => state.user);
  const { status, error } = useSelector((state) => state.event);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
    location: "",
  });

  const handleEventInput = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
    setMessage("");
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    const { title, description, image, date, location } = eventData;

    if (
      title === "" ||
      description === "" ||
      image === "" ||
      date === "" ||
      location === ""
    ) {
      setMessage("All fields are required");
      return;
    }
    dispatch(createEventAction({ eventData, token }));
  };

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }

    if (status === "Completed") {
      setMessage("Task Created Successfully");
      setEventData({
        title: "",
        description: "",
        image: "",
        date: "",
        location: "",
      });
    }
    if (status === "Failed") {
      setMessage(error);
    }
  }, [isLogged, status, error, navigate]);
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleEventSubmit}
        className=" flex justify-around items-center flex-col w-full h-fit max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-blue-400">CREATE EVENT</h2>
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleEventInput}
          placeholder="Title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          type="text"
          name="description"
          value={eventData.description}
          onChange={handleEventInput}
          rows={5}
          placeholder="Description"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
        <input
          type="url"
          name="image"
          value={eventData.image}
          onChange={handleEventInput}
          placeholder="Image URL (leave blank if not applicable)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleEventInput}
          placeholder="Date"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="location"
          value={eventData.location}
          onChange={handleEventInput}
          placeholder="Location"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <h3
          className={
            status === "Completed"
              ? "text-green-700  font-bold"
              : status === "Failed"
              ? "text-red-700 "
              : ""
          }
        >
          {message}
        </h3>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={status === "Loading"}
        >
          {status === "Loading" ? "Creating Task..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
