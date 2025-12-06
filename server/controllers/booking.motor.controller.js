import Booking from "../models/booking.motor.model.js";
import Motor from "../models/Motor.js";

// API to Check Availability of Motor for given Date and location
export const checkAvailabilityOfMotor = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    // Validate required fields
    if (!location || !pickupDate || !returnDate) {
      return res.status(400).json({
        success: false,
        message: "Location, pickup date, and return date are required",
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

    // Fetch all motors in the given location that are marked as available
    const motors = await Motor.find({
      location: { $regex: new RegExp(location, "i") }, // Case-insensitive search
      isAvailable: true,
    });

    // Check each motor's availability for the given date range
    const availableMotorsPromises = motors.map(async (motor) => {
      const isAvailable = await checkAvailability(
        motor._id,
        pickupDate,
        returnDate
      );
      return {
        ...motor._doc,
        isAvailable: isAvailable,
        availableDates: {
          from: pickupDate,
          to: returnDate,
        },
      };
    });

    let availableMotors = await Promise.all(availableMotorsPromises);
    availableMotors = availableMotors.filter(
      (motor) => motor.isAvailable === true
    );

    res.status(200).json({
      success: true,
      count: availableMotors.length,
      availableMotors,
    });
  } catch (error) {
    console.log("Error in checkAvailabilityOfMotor controller:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Helper function to check availability for a specific motor
const checkAvailability = async (motorId, pickupDate, returnDate) => {
  try {
    // Check for existing bookings that overlap with requested dates
    const overlappingBookings = await Booking.find({
      motor: motorId,
      status: { $in: ["pending", "confirmed"] },
      $or: [
        {
          // Booking starts before requested return AND ends after requested pickup
          pickupDate: { $lte: new Date(returnDate) },
          returnDate: { $gte: new Date(pickupDate) },
        },
        {
          // Booking is completely within requested dates
          pickupDate: { $gte: new Date(pickupDate) },
          returnDate: { $lte: new Date(returnDate) },
        },
        {
          // Requested dates are within existing booking
          pickupDate: { $lte: new Date(pickupDate) },
          returnDate: { $gte: new Date(returnDate) },
        },
      ],
    });

    // DEBUG: Log the overlapping bookings
    console.log(
      `Checking motor ${motorId}: Found ${overlappingBookings.length} overlapping bookings`
    );

    // If no overlapping bookings found, motor is available
    return overlappingBookings.length === 0;
  } catch (error) {
    console.error("Error checking availability for motor", motorId, ":", error);
    return false;
  }
};

// Create Booking
export const createBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      motor,
      pickupDate,
      returnDate,
      pickupLocation,
      rentalDays,
      selectedFeatures,
      totalPrice,
    } = req.body;

    console.log("Creating booking with data:", {
      motor,
      pickupDate,
      returnDate,
      pickupLocation,
      rentalDays,
      selectedFeatures,
      totalPrice,
      userId,
    });

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
    console.log(`Motor ${motor} availability check result:`, isAvailable);

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

    // Calculate number of days
    const timeDiff = returned - picked;
    const calculatedDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // Verify rentalDays matches calculated days
    if (rentalDays !== calculatedDays) {
      return res.status(400).json({
        success: false,
        message: "Rental days calculation mismatch",
      });
    }

    // Calculate base price
    const basePrice = motorData.pricePerDay * calculatedDays;

    // Calculate features price
    let featuresPrice = 0;
    if (selectedFeatures && Array.isArray(selectedFeatures)) {
      featuresPrice = selectedFeatures.reduce((total, feature) => {
        return total + (feature.price || 0);
      }, 0);
    }

    // Calculate total price if not provided
    const finalTotalPrice = totalPrice || basePrice + featuresPrice;

    // Create booking
    const booking = await Booking.create({
      motor: motorData._id,
      owner: motorData.owner,
      user: userId,
      pickupDate: picked,
      returnDate: returned,
      pickupLocation: pickupLocation || "main-office",
      rentalDays: calculatedDays,
      selectedFeatures: selectedFeatures || [],
      totalPrice: finalTotalPrice,
      status: "pending",
      paymentStatus: "pending",
    });

    console.log("Booking created successfully:", booking._id);

    // Populate booking details
    const populatedBooking = await Booking.findById(booking._id)
      .populate("motor", "brand model image engine_cc pricePerDay category")
      .populate("user", "name email phone")
      .populate("owner", "name email phone");

    res.status(201).json({
      success: true,
      message: "Motorcycle booking created successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error("Error in createBooking controller:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Simple availability check endpoint for single motor
export const checkMotorAvailability = async (req, res) => {
  try {
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

    // Check motor availability
    const isAvailable = await checkAvailability(motor, pickupDate, returnDate);

    res.status(200).json({
      success: true,
      available: isAvailable,
      message: isAvailable
        ? "Motor is available for selected dates"
        : "Motor is not available for selected dates",
    });
  } catch (error) {
    console.error("Error in checkMotorAvailability controller:", error);
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

// API to change booking status
export const changeBookingStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookingId, status } = req.body;

    // Validate input
    if (!bookingId || !status) {
      return res.status(400).json({
        success: false,
        message: "Booking ID and status are required",
      });
    }

    // Find the booking and populate car details
    const booking = await Booking.findById(bookingId).populate("motor");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check authorization - only owner can change status
    if (booking.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Only motor owner can change booking status",
      });
    }

    // Validate status
    const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    // Update motor availability based on status
    const motor = await Motor.findById(booking.motor._id);

    if (!motor) {
      return res.status(404).json({
        success: false,
        message: "Motor not found",
      });
    }

    // Update car availability
    if (status === "cancelled" || status === "completed") {
      motor.isAvailable = true;
    } else if (status === "confirmed") {
      motor.isAvailable = false;
    }
    // Note: "pending" status doesn't change car availability

    // Save car availability changes
    await motor.save();

    // Update booking status
    booking.status = status;
    await booking.save();

    res.json({
      success: true,
      message: "Booking status updated successfully",
      booking: {
        id: booking._id,
        status: booking.status,
        motor: {
          id: motor._id,
          isAvaliable: motor.isAvailable,
        },
      },
    });
  } catch (error) {
    console.error("Error in changeBookingStatus controller:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
