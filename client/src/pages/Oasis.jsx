import { useState } from "react";
import { errorHandler } from "../util/reactToastify";
import axios from "axios";

export default function Oasis() {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [country, setCountry] = useState("");
  const [achievments, setAchievments] = useState([]);

  const [input, setInput] = useState("");

  const fetchData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/gemini",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          prompt: input,
        },
      });
      console.log(data);
      setName(data.name);
      setBorn(data.born);
      setCountry(data.country);
      setAchievments(data.achievments);
    } catch (error) {
      const message = error.response.data.message || error.message;
      errorHandler(message);
    }
  };
  return (
    <div className="w-1/2 mx-auto mt-12">
      <h2 className="text-2xl">Enhance your knowledge about football here</h2>
      <h3 className="text-lg text-center py-3">Ask about a player profile</h3>
      <form className="flex flex-col space-y-3" onSubmit={fetchData}>
        <input
          className="border-2 p-1"
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
        />
        <button
          className="font-semibold outline outline-green-700 bg-green-400 rounded-md px-2 py-1 hover:bg-blue-300"
          type="submit"
        >
          Submit
        </button>
      </form>

      {name && (
        <ul className="mt-6">
          <li className="border-2 p-1">Name: {name}</li>
          <li className="border-2 p-1">Born: {born}</li>
          <li className="border-2 p-1">Country: {country}</li>
          <li className="border-2 p-1">Achievments: </li>
          {achievments.map((e, index) => {
            return <li className="border-2 p-1" key={index}>{e.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
