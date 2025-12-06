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

// API to Create Motor Booking
export const createBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { motor, pickupDate, returnDate } = req.body;

    // Validate required fields
    if (!motor || !pickupDate || !returnDate) {
      return res.status(400).json({
        success: false,
        message: "Motor, pickup date, and return date are required",
      });
    }

    // Parse dates
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);

    if (isNaN(picked.getTime()) || isNaN(returned.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }

    if (picked >= returned) {
      return res.status(400).json({
        success: false,
        message: "Return date must be after pickup date",
      });
    }

    if (picked < new Date().setHours(0, 0, 0, 0)) {
      return res.status(400).json({
        success: false,
        message: "Pickup date cannot be in the past",
      });
    }

    // Check motor availability
    const isAvailable = await checkAvailability(motor, pickupDate, returnDate);

    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Motor is not available for the selected dates",
      });
    }

    // Get motor data
    const motorData = await Motor.findById(motor);

    if (!motorData) {
      return res.status(404).json({
        success: false,
        message: "Motor not found",
      });
    }

    // Calculate no. of days and price
    const timeDiff = returned - picked;
    const noOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const price = motorData.pricePerDay * noOfDays;

    // Create booking
    const booking = await Booking.create({
      motor,
      owner: motorData.owner,
      user: userId,
      pickupDate: picked,
      returnDate: returned,
      price,
      noOfDays,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: {
        id: booking._id,
        motor: booking.motor,
        pickupDate: booking.pickupDate,
        returnDate: booking.returnDate,
        price: booking.price,
        noOfDays: booking.noOfDays,
        status: booking.status,
      },
    });
  } catch (error) {
    console.error("Error in createBooking controller:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// API to List User Bookings
export const getUserBookings = async (req, res) => {
  try {
    const id = req.user._id;

    const bookings = await Booking.find({
      user: id,
    })
      .populate("motor")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log("Error in getUserBookings controller");
    res.json({ success: false, message: error.message });
  }
};

// API to get Owner Bookings
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.json({ success: false, message: "UnAuthorized" });
    }
    const id = req.user._id;

    const bookings = await Booking.find({ owner: id })
      .populate("motor user")
      .select("-user.password")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log("Error in getOwnerBookings controller");
    res.json({ success: false, message: error.message });
  }
};
