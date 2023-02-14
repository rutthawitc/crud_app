import React from "react";
import { BiErrorCircle } from "react-icons/bi";

function Bug({ message }) {
  return (
    <div className="container mx-auto success">
      <div className="flex justify-center w-3/6 py-2 mx-auto my-4 text-center bg-red-400 border border-red-200 text-slate-700 text-md bg-opacity-5">
        {message}{" "}
        <BiErrorCircle size={24} color={"rgb(245, 78, 66)"}></BiErrorCircle>
      </div>
    </div>
  );
}

export default Bug;
