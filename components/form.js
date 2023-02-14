import AddUserForm from "./adduserForm";
import UpdateUserForm from "./updateUserForm";
import { useSelector } from "react-redux";

const flag = false;

function Form() {
  const formId = useSelector((state) => state.app.client.formId);
  return (
    <div className="container py-5 mx-auto">
      {formId ? <UpdateUserForm /> : <AddUserForm />}
    </div>
  );
}

export default Form;
