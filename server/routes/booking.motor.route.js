import express from "express";
import { protect } from "../middleware/auth.js";
import {
  changeBookingStatus,
  checkAvailabilityOfMotor,
  createBooking,
  getOwnerBookings,
  getUserBookings,
} from "../controllers/booking.motor.controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityOfMotor);
bookingRouter.post("/create", protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/owner", protect, getOwnerBookings);
bookingRouter.post("/change-status", protect, changeBookingStatus);

export default bookingRouter;
