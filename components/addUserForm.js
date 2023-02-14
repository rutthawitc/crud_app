import React, { useReducer } from "react";
import { Reducer } from "react";
import { BiPlus } from "react-icons/bi";
import Success from "./success";
import Bug from "./bug";
import { useQueryClient, useMutation } from "react-query";
import { addUser, getUsers } from "../lib/helper";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

function AddUserForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useReducer(formReducer, {});
  const addMutation = useMutation(addUser, {
    onSuccess: () => {
      // console.log("Data Inserted");
      queryClient.prefetchQuery("users", getUsers);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length == 0)
      return console.log("Don't have form data");
    //console.log(formData);
    let { firstname, lastname, email, salary, date, status } = formData;
    const model = {
      name: `${firstname} ${lastname}`,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 10
      )}.jpg`,
      email,
      salary,
      date,
      status: status ?? "Active",
    };
    addMutation.mutate(model);
  };
  // if (Object.keys(formData).length > 0)
  //   return <Success message={"Data Added"}></Success>;
  if (addMutation.isLoading) return <div>Loading</div>;
  if (addMutation.isError)
    return <Bug message={addMutation.error.message}></Bug>;
  if (addMutation.isSuccess)
    return <Success message={"Added Successfull"}></Success>;

  return (
    <form className="grid w-4/6 gap-4 lg:grid-cols-2" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          onChange={setFormData}
          type="text"
          name="firstname"
          placeholder="First Name"
          className="w-full py-3 border rounded-md px- 5 foucus:outline-none"
        ></input>
      </div>
      <div className="input-type">
        <input
          onChange={setFormData}
          type="text"
          name="lastname"
          placeholder="Last Name"
          className="w-full py-3 border rounded-md px- 5 foucus:outline-none"
        ></input>
      </div>
      <div className="input-type">
        <input
          onChange={setFormData}
          type="text"
          name="email"
          placeholder="Email"
          className="w-full py-3 border rounded-md px- 5 foucus:outline-none"
        ></input>
      </div>
      <div className="input-type">
        <input
          onChange={setFormData}
          type="text"
          name="salary"
          placeholder="Salary"
          className="w-full py-3 border rounded-md px- 5 foucus:outline-none"
        ></input>
      </div>
      <div>
        <input
          onChange={setFormData}
          type="date"
          name="date"
          className="px-5 py-3 border rounded-md focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-10">
        <div className="form-check">
          <input
            onChange={setFormData}
            type="radio"
            name="status"
            value="Active"
            id="radioDefault1"
            className="float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border rounded-full appearance-none cursor-pointer form-check-input border-slate-400 checked:bg-green-400 checked:border-green-500 focus:outline-none"
          />
          <label
            htmlFor="radioDefault1"
            className="inline-block text-slate-800"
          >
            Active
          </label>
        </div>
        <div className="form-check">
          <input
            onChange={setFormData}
            type="radio"
            name="status"
            value="Inactive"
            id="radioDefault2"
            className="float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border rounded-full appearance-none cursor-pointer form-check-input border-slate-400 checked:bg-green-400 checked:border-green-500 focus:outline-none"
          />
          <label
            htmlFor="radioDefault2"
            className="inline-block text-slate-800"
          >
            Inactive
          </label>
        </div>
      </div>
      <button className="flex justify-center w-2/6 px-4 py-2 text-white bg-green-400 rounded-md text-md hover:bg-slate-200 hover:border-green-400 hover:text-green-400">
        Add{" "}
        <span className="px-1">
          <BiPlus size={23}></BiPlus>
        </span>
      </button>
    </form>
  );
}

export default AddUserForm;
