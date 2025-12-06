import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const motorSchema = new mongoose.Schema(
  {
    owner: { type: ObjectId, ref: "User" },

    brand: { type: String, required: true }, // e.g., Honda, Yamaha
    model: { type: String, required: true }, // e.g., Aerox 155, Click 125
    image: { type: String, required: true },
    year: { type: Number, required: true },

    engine_cc: { type: Number, required: true }, // 125cc, 150cc, 400cc, etc.
    category: { type: String, required: true }, // scooter, underbone, big bike
    fuel_type: { type: String, required: true }, // gas, diesel (rare), or electric
    transmission: { type: String, required: true }, // automatic / manual

    pricePerDay: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },

    isAvailable: { type: Boolean, default: true },

    hearts: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

const Motor = mongoose.model("Motor", motorSchema);
export default Motor;
