import Users from "../model/user";

//get: http://localhost:3000/api/users
export async function getUsers(req, res) {
  try {
    const users = await Users.find({});
    if (!users) return res.status(404).json({ error: "Data not found" });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: "Error fetching Data" });
  }
}

export async function getUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await Users.findById(userId);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "User not selected..!" });
  } catch (error) {
    res.status(404).json({ error: "Can not get the user!" });
  }
}

//post: http://localhost:3000/api/users
export async function postUser(req, res) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: "Form data not provided.." });
    Users.create(formData, function (error, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error: "Error while post data" });
  }
}

//put: http://localhost:3000/api/users/1
export async function updateUser(req, res) {
  try {
    const { userId } = req.query;
    const formData = req.body;
    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "User not selected..!" });
  } catch (error) {
    return res.status(404).json({ error: "Error while update user data." });
  }
}

//delete: http://localhost:3000/api/users
export async function deleteUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await Users.findByIdAndDelete(userId);
      return res.status(200).json({ user });
    }
    return res.status(404).json({ error: "User not selected..!" });
  } catch (error) {
    return res.status(404).json({ error: "Error wile deleting user..!" });
  }
}
