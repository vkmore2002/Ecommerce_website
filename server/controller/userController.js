import User from "../model/userModel.js";

//this will get user by it's id
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
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

    let updateUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

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
