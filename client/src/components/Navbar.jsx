import { useNavigate, NavLink } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="flex justify-between items-center px-2 py-3 bg-sky-300">
      <div className="flex space-x-2 divide-x-2 divide-slate-700">
        <div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-semibold tracking-wider uppercase text-violet-700 px-2 hover:text-violet-700"
                : "font-semibold tracking-wider uppercase text-slate-800 px-2 hover:text-violet-700"
            }
          >
            Home
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/myprofile"
            className={({ isActive }) =>
              isActive
                ? "font-semibold tracking-wider uppercase text-violet-700 px-2 hover:text-violet-700"
                : "font-semibold tracking-wider uppercase text-slate-800 px-2 hover:text-violet-700"
            }
          >
            My Profile
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive
                ? "font-semibold tracking-wider uppercase text-violet-700 px-2 hover:text-violet-700"
                : "font-semibold tracking-wider uppercase text-slate-800 px-2 hover:text-violet-700"
            }
          >
            All Users
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/leagues"
            className={({ isActive }) =>
              isActive
                ? "font-semibold tracking-wider uppercase text-violet-700 px-2 hover:text-violet-700"
                : "font-semibold tracking-wider uppercase text-slate-800 px-2 hover:text-violet-700"
            }
          >
            Leagues
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/articles"
            className={({ isActive }) =>
              isActive
                ? "font-semibold tracking-wider uppercase text-violet-700 px-2 hover:text-violet-700"
                : "font-semibold tracking-wider uppercase text-slate-800 px-2 hover:text-violet-700"
            }
          >
            Articles
          </NavLink>
        </div>
      </div>

      <div>
        <Button
          fn={handleLogout}
          className={
            "font-semibold outline outline-green-700 bg-green-400 rounded-md px-2 py-1 hover:bg-red-400"
          }
          type={"button"}
          label={"Logout"}
        />
      </div>
    </div>
  );
}
