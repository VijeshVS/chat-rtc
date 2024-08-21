import React, { useState } from "react";
import { login } from "../utils/auth";
import { toast } from "react-toastify";

const Login = ({ setLoginState, setAuth,setMainUsername }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-white flex flex-col h-full space-y-6 rounded-xl p-4 items-center justify-center">
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <div className="flex flex-col space-y-1">
        <p className="font-semibold">Name</p>
        <input
          type="text"
          className="focus:outline-none border-2 w-72 border-gray-200 p-2 rounded-2xl"
          placeholder="Enter your name"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex flex-col space-y-1">
        <p className="font-semibold">Password</p>
        <input
          type="password"
          className="focus:outline-none border-2 w-72 border-gray-200 p-2 rounded-2xl"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={() => {
            const res = login(username, password).then((res) => {
              localStorage.setItem("token", res.token);
              setAuth(true);
              setMainUsername(jwtDecode(localStorage.getItem('token')).username)
            });

            toast.promise(res, {
              pending: "Logging in....",
              success: "Logged in successfully 👌",
              error: "Login Failed",
            });
          }}
          className="bg-black text-white font-bold p-3 rounded-3xl hover:scale-105 text-sm w-24"
        >
          Login
        </button>
        <div className="flex mt-2">
          <p className="text-sm text-gray-400">Already have an account?</p>
          <p
            onClick={() => setLoginState(false)}
            className="text-sm text-blue-500 ml-1 cursor-pointer"
          >
            Register
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
