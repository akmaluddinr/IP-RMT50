import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { errorHandler, successHandler } from "../util/reactToastify";

export default function Login() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function inputChange(e) {
    console.log(e.target.value);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/login",
        data: userData,
      });
      localStorage.setItem("token", data.access_token);
      successHandler("Login successfully");
      navigate("/");
    } catch (error) {
      const message = error.response.data.message || error.message;
      errorHandler(message);
    }
  }

  return (
    <div>
      <div className="bg-sky-300 text-center py-4 text-slate-800">
        <h1 className="text-5xl font-bold">Welcome to Total Football</h1>
        <h2 className="text-3xl mt-3">
          You can find anything about Football here
        </h2>
      </div>

      <p className="text-center text-xl font-semibold mt-6">
        Please log in if you already have an account
      </p>

      <div className="px-8 py-12 bg-sky-300 max-w-md rounded-xl mx-auto mt-4 text-center">
        <form
          onSubmit={handleLogin}
          className="flex flex-col space-y-3 text-base"
        >
          <input
            name="email"
            value={userData.email}
            onChange={inputChange}
            type="text"
            placeholder="Email"
            className="border-2 border-green-400 rounded-md p-1"
          />
          <input
            name="password"
            value={userData.password}
            onChange={inputChange}
            type="password"
            placeholder="Password"
            className="border-2 border-green-400 rounded-md p-1"
          />
          <Button
            className={
              "font-semibold outline outline-green-700 bg-green-400 rounded-md px-2 py-1 hover:bg-blue-300"
            }
            type={"submit"}
            label={"Log In"}
          />
        </form>
        <div className="text-center text-sm mt-3">
          <span>
            Don't have account yet?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-700 hover:text-violet-500"
            >
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
