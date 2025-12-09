import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const bookingSchema = new mongoose.Schema(
  {
    motor: {
      type: ObjectId,
      ref: "Motor",
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    pickupDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    dropOffLocation: {
      type: String,
      required: true,
    },
    rentalDays: {
      type: Number,
      required: true,
    },
    totalKm: {
      type: Number,
      required: true,
      default: 0,
    },
    selectedFeatures: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking-Motor", bookingSchema);
export default Booking;
