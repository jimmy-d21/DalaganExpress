import Booking from "../models/booking.motor.model.js";
import Motor from "../models/Motor.js";

// Helper function to check motor availability
const checkAvailability = async (motorId, pickupDate, returnDate) => {
  try {
    const existingBookings = await Booking.find({
      motor: motorId,
      status: { $in: ["pending", "confirmed"] },
      $or: [
        {
          pickupDate: { $lte: new Date(returnDate) },
          returnDate: { $gte: new Date(pickupDate) },
        },
      ],
    });

    return existingBookings.length === 0;
  } catch (error) {
    console.error("Error checking availability:", error);
    return false;
  }
};

// API to Check Availability of Motor for given Date and location
export const checkAvailabilityOfMotor = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    // fetch all available cars for the given location
    const motor = await Motor.find({
      location,
      isAvaliable: true,
    });

    // Check car availability for the given date range using promise
    const availableMotorPromises = motor.map(async (motor) => {
      const isAvaliable = await checkAvailability(
        motor._id,
        pickupDate,
        returnDate
      );
      return { ...motor._doc, isAvaliable: isAvaliable };
    });

    let availableMotor = await Promise.all(availableMotorPromises);
    availableMotor = availableMotor.filter(
      (motor) => motor.isAvaliable === true
    );

    res.json({ success: true, availableMotor });
  } catch (error) {
    console.log("Error in checkAvailabilityOfMotor controller");
    res.json({ success: false, message: error.message });
  }
};
