import React from "react";
import { BiTrashAlt, BiEdit } from "react-icons/bi";
import { getUsers } from "../lib/helper";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, updateAction } from "../redux/reducer";

function Table() {
  //console.log(getUser());
  //getUser().then((res) => console.log(res));
  const { isLoading, isError, data, error } = useQuery("users", getUsers);
  if (isLoading) return <div>The employees is loading</div>;
  if (isError) return <div>Got an ERROR</div>;

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-slate-600">
          <th className="px-16 py-2">
            <span className="text-gray-400">Name</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-400">Email</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-400">Salary</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-400">Birthday</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-400">Status</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-400">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-slate-400">
        {data.map((obj, i) => (
          <Tr {...obj} key={i} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;

function Tr({ _id, name, avatar, email, salary, date, status }) {
  //console.log(...obj);
  const visible = useSelector((state) => state.app.client.toggleForm);
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(toggleChangeAction());
    //console.log(visible);
    if (visible) {
      dispatch(updateAction(_id));
    }
  };
  return (
    <tr className="text-center bg-slate-100">
      <td className="flex flex-row items-center px-16 py-2">
        <img
          src={avatar || "#"}
          alt="User Avatar "
          className="object-cover w-8 h-8 rounded-full"
        />
        <span className="ml-2 font-semibold text-center text-black">
          {name || "Unknow"}
        </span>
      </td>
      <td className="px-16 py-2 text-black">
        <span>{email || "Unknow"}</span>
      </td>
      <td className="px-16 py-2 text-black">
        <span>{salary || "Unknow"}</span>
      </td>
      <td className="px-16 py-2 text-black">
        <span>{date || "Unknow"}</span>
      </td>
      <td className="px-16 py-2">
        <button>
          <span
            className={`${
              status == "Active" ? " bg-green-400" : " bg-rose-400"
            } px-5 py-1 text-white rounded-full`}
          >
            {status || "Unknow"}
          </span>
        </button>
      </td>
      <td className="flex justify-around gap-3 px-16 py-2">
        <button className="cursor" onClick={onUpdate}>
          <BiEdit size={25} color={"rgb(66, 245, 117)"}></BiEdit>
        </button>
        <button className="cursor">
          <BiTrashAlt size={25} color={"rgb(245, 66, 66)"}></BiTrashAlt>
        </button>
      </td>
    </tr>
  );
}
