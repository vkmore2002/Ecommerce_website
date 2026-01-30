import { Router } from "express";
import {
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
} from "../controller/userController.js";
import { authentication, authorization } from "../middleware/authentication.js";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("User Router is Working fine");
});

//this will get user by it's id
userRouter.get("/user", authentication, getUserById);

//this will get all the users
userRouter.get("/users", authentication, authorization, getAllUsers);

//update user by id
userRouter.put("/user/:id", authentication, updateUserById);

//delete user by id
userRouter.delete("/user/:id", authentication, authorization, deleteUserById);

export default userRouter;
