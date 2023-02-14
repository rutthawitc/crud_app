import connectMongo from "../../../database/conn";
import { getUser, updateUser, deleteUser } from "../../../database/controller";

export default function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Erroe in the connection" })
  );
  //Type of request
  const { method } = req;
  switch (method) {
    case "GET":
      getUser(req, res);
      break;
    case "PUT":
      updateUser(req, res);
      break;
    case "DELETE":
      deleteUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      res.end();
      break;
  }
}
