import express from "express";
import { protect } from "../middleware/auth.js";
import {
  changeBookingStatus,
  checkAvailabilityOfMotor,
  checkMotorAvailability,
  createBooking,
  getOwnerBookings,
  getUserBookings,
} from "../controllers/booking.motor.controller.js";

const bookingMotorRouter = express.Router();

bookingMotorRouter.post("/check-availability", checkAvailabilityOfMotor);
bookingMotorRouter.post("/check-motor-availability", checkMotorAvailability);
bookingMotorRouter.post("/create", protect, createBooking);
bookingMotorRouter.get("/user", protect, getUserBookings);
bookingMotorRouter.get("/owner", protect, getOwnerBookings);
bookingMotorRouter.post("/change-status", protect, changeBookingStatus);

export default bookingMotorRouter;
