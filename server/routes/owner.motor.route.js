import express from "express";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import {
  addMotor,
  changeRoleToOwner,
  deleteMotor,
  getDashboardData,
  getOwnerMotors,
  toggleMotorAvailability,
  updateUserImage,
} from "../controllers/owner.motor.controller.js";

const ownerMotorRouter = express.Router();

ownerMotorRouter.post("/change-role", protect, changeRoleToOwner);
ownerMotorRouter.post("/add-motor", upload.single("image"), protect, addMotor);
ownerMotorRouter.get("/motors", protect, getOwnerMotors);
ownerMotorRouter.post("/toggle-motor", protect, toggleMotorAvailability);
ownerMotorRouter.post("/delete-motor", protect, deleteMotor);
ownerMotorRouter.get("/dashboard", protect, getDashboardData);
ownerMotorRouter.post(
  "/update-image",
  upload.single("image"),
  protect,
  updateUserImage
);

export default ownerMotorRouter;
