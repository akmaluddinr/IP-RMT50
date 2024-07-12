import { useState } from "react";
import { errorHandler } from "../util/reactToastify";
import axios from "axios";

export default function Oasis() {
  const [data, setData] = useState("");

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
      // setData(data);
    } catch (error) {
      const message = error.response.data.message || error.message;
      errorHandler(message);
    }
  };
  return (
    <div className="w-1/2 mx-auto mt-12">
      <form className="flex flex-col space-y-3" onSubmit={fetchData}>
        <input
          className="border-2"
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
      <input
        type="textarea"
        className="border-2 mt-10 w-full h-[300px]"
        value={data}
        readOnly
      />
    </div>
  );
}
