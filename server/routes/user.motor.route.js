import express from "express";
import { protect } from "../middleware/auth.js";
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  getAllMotors,
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/user.motor.controller.js";

const userMotorRouter = express.Router();

// Authentication routes
userMotorRouter.post("/register", registerUser);
userMotorRouter.post("/login", loginUser);
userMotorRouter.get("/data", protect, getUserData);

// Motor routes
userMotorRouter.get("/motors", getAllMotors);

// Favorite routes
userMotorRouter.post("/add-favorite", protect, addToFavorites);
userMotorRouter.post("/remove-favorite", protect, removeFromFavorites);
userMotorRouter.get("/favorites", protect, getFavorites);

export default userMotorRouter;
