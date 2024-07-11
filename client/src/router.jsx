import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import MyProfile from "./pages/MyProfile";
import Leagues from "./pages/Leagues";
import Articles from "./pages/Articles";
import AllUsers from "./pages/Users";
import MainLayout from "./layouts/MainLayout";
import Clubs from "./pages/Clubs";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    loader: () => {
      const token = localStorage.getItem("token");
      if (token) {
        return redirect("/");
      }
      return null;
    },
    path: "/login",
    element: <Login />,
  },
  {
    loader: () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return redirect("/login");
      }
      return null;
    },
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/myprofile",
        element: <MyProfile />,
      },
      {
        path: "/leagues",
        element: <Leagues />,
      },
      {
        path: "/articles",
        element: <Articles />,
      },
      {
        path: "/users",
        element: <AllUsers />,
      },
      {
        path: "/clubs/:id",
        element: <Clubs />,
      },
    ],
  },
]);
