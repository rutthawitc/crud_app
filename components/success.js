import React from "react";
import { BiCheck } from "react-icons/bi";

function Success({ message }) {
  return (
    <div className="container mx-auto success">
      <div className="flex justify-center w-3/6 py-2 mx-auto my-4 text-center bg-yellow-400 border border-yellow-200 text-slate-700 text-md bg-opacity-5">
        {message} <BiCheck size={24} color={"rgb(135, 245, 66)"}></BiCheck>
      </div>
    </div>
  );
}

export default Success;
