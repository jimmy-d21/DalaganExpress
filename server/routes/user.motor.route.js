import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getAllMotors,
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/user.motor.controller.js";

const userMotorRouter = express.Router();

userMotorRouter.post("/register", registerUser);
userMotorRouter.post("/login", loginUser);
userMotorRouter.get("/data", protect, getUserData);
userMotorRouter.get("/motors", getAllMotors);

export default userMotorRouter;
