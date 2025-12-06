import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getAllMotors,
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/user.motor.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, getUserData);
userRouter.get("/motors", getAllMotors);

export default userRouter;
