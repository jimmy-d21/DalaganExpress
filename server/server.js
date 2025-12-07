import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

import userMotorRouter from "./routes/user.motor.route.js";
import ownerMotorRouter from "./routes/owner.motor.route.js";
import bookingMotorRouter from "./routes/booking.motor.route.js";

// Initialize Express App
const app = express();

// Connect Database
await connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);

app.get(`/`, (req, res) => {
  res.send(`Server is ready in Dalagan Express`);
});

// Routes
app.use("/api/motor/user", userMotorRouter);
app.use("/api/motor/owner", ownerMotorRouter);
app.use("/api/motor/bookings", bookingMotorRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`);
});
