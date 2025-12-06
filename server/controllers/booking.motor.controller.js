import Booking from "../models/booking.motor.model";

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
