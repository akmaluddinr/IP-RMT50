import { Link } from "react-router-dom";
import Button from "./Button";

export default function Card(props) {
  const { id, name, logoImg, countryImg, country, fn } = props;
  return (
    <Link to={"/clubs/" + id}>
      <div className="flex flex-col justify-between items-center w-64 h-64 p-4 border-2 border-slate-400 rounded-md">
        <div>
          <img src={logoImg} alt="league's logo" className="object-cover" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-lg">
            <h3>{name}</h3>
          </div>
        </div>
        <button
          className={
            "font-semibold outline outline-green-700 bg-green-400 rounded-md px-2 py-1 hover:bg-blue-300"
          }
        >
          See Club Detail
        </button>
      </div>
    </Link>
  );
}
