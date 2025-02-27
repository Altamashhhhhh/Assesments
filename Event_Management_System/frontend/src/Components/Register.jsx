import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { registerUserAction } from "../redux/actions/userAction";

const Register = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { error, status } = useSelector((state) => state.user);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const handleRegisterInput = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const { name, email, role, password } = registerData;
    if (name === "" || email === "" || role === "" || password === "") {
      setMessage("All fields are required");
      return;
    }
    dispatch(registerUserAction(registerData));
  };

  useEffect(() => {
    if (status === "Completed") {
      setMessage("User Registration Successfull");
      setRegisterData({
        name: "",
        email: "",
        role: "",
        password: "",
      });
    } else if (status === "Failed") {
      setMessage(error);
    }
  }, [status, error]);
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleRegisterSubmit}
        className=" flex justify-around items-center flex-col w-full h-fit max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-blue-400">REGISTER</h2>
        <input
          type="text"
          name="name"
          value={registerData.name}
          onChange={handleRegisterInput}
          placeholder="Full Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          value={registerData.email}
          onChange={handleRegisterInput}
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="role"
          value={registerData.role}
          onChange={handleRegisterInput}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <input
          type="password"
          name="password"
          value={registerData.password}
          onChange={handleRegisterInput}
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-md text-gray-600">
          Already have an account? Please{" "}
          <NavLink className="text-blue-400 " to="/login">
            Login.
          </NavLink>
        </p>
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
          {status === "Loading" ? "Registering..." : "Register Now"}
        </button>
      </form>
    </div>
  );
};

export default Register;
