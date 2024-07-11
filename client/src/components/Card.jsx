import { Link } from "react-router-dom";

export default function Card(props) {
  const { id, name, logoImg, countryImg, country } = props;
  return (
    <Link to={"/clubs/" + id}>
      <div className="flex flex-col justify-between items-center w-64 h-64 p-4 border-2 border-slate-400 rounded-md hover:bg-sky-400 hover:opacity-70 hover:scale-105">
        <div>
          <img src={logoImg} alt="league's logo" className="object-cover" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-lg">
            <h3>{name}</h3>
          </div>
          {countryImg && (
            <div className="flex space-x-1 items-center">
              <img src={countryImg} alt="flag" className="w-4" />
              <p>{country}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
