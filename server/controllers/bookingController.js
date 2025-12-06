import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// Helper function to check car availability
const checkAvailability = async (carId, pickupDate, returnDate) => {
  try {
    const existingBookings = await Booking.find({
      car: carId,
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

// API to Check Availability of Car for given Date and location
export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    // fetch all available cars for the given location
    const cars = await Car.find({
      location,
      isAvaliable: true,
    });

    // Check car availability for the given date range using promise
    const availableCarsPromises = cars.map(async (car) => {
      const isAvaliable = await checkAvailability(
        car._id,
        pickupDate,
        returnDate
      );
      return { ...car._doc, isAvaliable: isAvaliable };
    });

    let availableCars = await Promise.all(availableCarsPromises);
    availableCars = availableCars.filter((car) => car.isAvaliable === true);

    res.json({ success: true, availableCars });
  } catch (error) {
    console.log("Error in checkAvailabilityOfCar controller");
    res.json({ success: false, message: error.message });
  }
};

// API to Create Booking
export const createBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { car, pickupDate, returnDate } = req.body;

    // Validate required fields
    if (!car || !pickupDate || !returnDate) {
      return res.status(400).json({
        success: false,
        message: "Car, pickup date, and return date are required",
      });
    }

    // Validate dates
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

    // Check car availability
    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Car is not available for the selected dates",
      });
    }

    // Get car data
    const carData = await Car.findById(car);
    if (!carData) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    // Calculate number of days and price
    const timeDiff = returned - picked;
    const noOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const price = carData.pricePerDay * noOfDays;

    // Create booking
    const booking = await Booking.create({
      car,
      owner: carData.owner,
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
        car: booking.car,
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
      .populate("car")
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
      .populate("car user")
      .select("-user.password")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log("Error in getUserBookings controller");
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
    const booking = await Booking.findById(bookingId).populate("car");

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
        message: "Unauthorized: Only car owner can change booking status",
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

    // Update car availability based on status
    const car = await Car.findById(booking.car._id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    // Update car availability
    if (status === "cancelled" || status === "completed") {
      car.isAvaliable = true;
    } else if (status === "confirmed") {
      car.isAvaliable = false;
    }
    // Note: "pending" status doesn't change car availability

    // Save car availability changes
    await car.save();

    // Update booking status
    booking.status = status;
    await booking.save();

    res.json({
      success: true,
      message: "Booking status updated successfully",
      booking: {
        id: booking._id,
        status: booking.status,
        car: {
          id: car._id,
          isAvaliable: car.isAvaliable,
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
