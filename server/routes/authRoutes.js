import { Router } from "express";
import { userLogin, newRegister } from "../controller/authController.js";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.send("Auth route is working");
});
authRouter.post("/login", userLogin);
authRouter.post("/register", newRegister);

export default authRouter;
