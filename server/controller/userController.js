import User from "../model/userModel.js";
import getUserDetialsFromToken from "../helper/getDetialsFromToken.js";

//this will get user by it's id
const getUserById = async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const userIdFromToken = getUserDetialsFromToken(token);
    const userId = userIdFromToken.userId;
    const user = await User.findOne({ email: userIdFromToken.email }).select(
      "-password",
    );
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

//this will get all the users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

//this will update an specific user by it's id
const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    if (updateData.password) {
      return res
        .status(400)
        .send("Password cannot be updated through this endpoint");
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { ...updateData, updatedAt: Date.now() },
      { new: true },
    ).select("-password");

    if (!updateUser) {
      res.status(404).send("User not found");
    }

    return res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

//this will delete user by it's id
const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    let user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send("user not found");
    }

    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(500).send("internal Server Error");
  }
};

export { getUserById, getAllUsers, updateUserById, deleteUserById };
