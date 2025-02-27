import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUserAction } from "../redux/actions/userAction";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { error, status, isLogged } = useSelector((state) => state.user);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (email === "" || password === "") {
      setMessage("All fields are required.");
      return;
    }
    dispatch(loginUserAction(loginData));
  };

  useEffect(() => {
    if (status === "Completed") {
      setMessage("Login Successful");
      setLoginData({ email: "", password: "" });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else if (status === "Failed") {
      setMessage(error);
    }
  }, [status, error, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleLoginSubmit}
        className=" flex justify-around items-center flex-col w-full h-100 max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-blue-400">LOG IN</h2>
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleLoginInput}
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleLoginInput}
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <p className="text-md text-gray-600">
          Don't have an account?{" "}
          <NavLink className="text-blue-400 " to="/register">
            Register here.
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
          {status === "Loading" ? "Logging in..." : "Login Now"}
        </button>
      </form>
    </div>
  );
};

export default Login;
