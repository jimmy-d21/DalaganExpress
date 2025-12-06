import imagekit from "../configs/imageKit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from "fs";

// API to Change Role of User
export const changeRoleToOwner = async (req, res) => {
  try {
    const id = req.user._id;
    await User.findByIdAndUpdate(id, {
      role: "owner",
    });
    res.json({ success: true, message: "Now you can list cars" });
  } catch (error) {
    console.log("Error in changeRoleToOwner controller");
    res.json({ success: false, message: error.message });
  }
};

// API to List Car
export const addCar = async (req, res) => {
  try {
    const id = req.user._id;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    // Upload Image to Imagekit
    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    // For URL Generation, works for both images and videos
    // Optimization through imageKit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" }, // Width resizing
        { quality: "auto" }, // Auto compression
        { format: "webp" }, // Convert to modern format
      ],
    });

    const image = optimizedImageUrl;

    await Car.create({ ...car, owner: id, image });

    res.json({ success: true, message: "Car Added" });
  } catch (error) {
    console.log("Error in addCar controller");
    res.json({ success: false, message: error.message });
  }
};

// API to List Owner Cars
export const getOwnerCars = async (req, res) => {
  try {
    const id = req.user._id;
    const cars = await Car.find({ owner: id });

    res.json({ success: true, cars });
  } catch (error) {
    console.log("Error in getOwnerCars controller");
    res.json({ success: false, message: error.message });
  }
};

// API to Toggle Car Availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const id = req.user._id;
    const { carId } = req.body;

    const car = await Car.findById(carId);

    // Checking is car belongs to the user
    if (car.owner.toString() !== id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    car.isAvaliable = !car.isAvaliable;
    await car.save();

    res.json({ success: true, message: "Availability Toggled" });

    /*
      if (car.isAvaliable) {
      await Car.findByIdAndUpdate(carId, { isAvaliable: false });
      res.json({ success: true, message: "UnAvailable" });
    } else {
      await Car.findByIdAndUpdate(carId, { isAvaliable: true });
      res.json({ success: true, message: Available });
    }
    */
  } catch (error) {
    console.log("Error in toggleCarAvailability controller");
    res.json({ success: false, message: error.message });
  }
};

// API to Delete a Car
export const deleteCar = async (req, res) => {
  try {
    const id = req.user._id;
    const { carId } = req.body;

    const car = await Car.findById(carId);

    // Checking is car belongs to the user
    if (car.owner.toString() !== id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    car.owner = null; // removed the owner for cardata
    car.isAvaliable = false; // it will not available it can't delete this data because if someone book this car it will display in booking history just remove the owner from this car

    await car.save();

    res.json({ success: true, message: "Car Removed" });
  } catch (error) {
    console.log("Error in deleteCar controller");
    res.json({ success: false, message: error.message });
  }
};

// API to get Dashboard Data
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.json({ success: false, message: "Unauthorized" });
    }

    // Get current date for calculations
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Fetch all data
    const cars = await Car.find({ owner: _id });
    const allBookings = await Booking.find({ owner: _id })
      .populate("car")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    // Filter bookings by status
    const pendingBookings = allBookings.filter((b) => b.status === "pending");
    const confirmedBookings = allBookings.filter(
      (b) => b.status === "confirmed"
    );
    const completedBookings = allBookings.filter(
      (b) => b.status === "completed"
    );
    const cancelledBookings = allBookings.filter(
      (b) => b.status === "cancelled"
    );

    // Active bookings (confirmed but not yet completed)
    const activeBookings = allBookings.filter(
      (b) => b.status === "confirmed" && new Date(b.returnDate) >= currentDate
    );

    // Calculate earnings
    // Total earnings from all completed and confirmed bookings
    const totalEarnings = allBookings
      .filter(
        (booking) =>
          booking.status === "completed" || booking.status === "confirmed"
      )
      .reduce((acc, booking) => acc + booking.price, 0);

    // Monthly revenue (current month only)
    const monthlyRevenue = allBookings
      .filter((booking) => {
        const bookingDate = new Date(booking.createdAt);
        return (
          (booking.status === "completed" || booking.status === "confirmed") &&
          bookingDate.getMonth() === currentMonth &&
          bookingDate.getFullYear() === currentYear
        );
      })
      .reduce((acc, booking) => acc + booking.price, 0);

    // Calculate revenue change from last month
    const lastMonthRevenue = allBookings
      .filter((booking) => {
        const bookingDate = new Date(booking.createdAt);
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const year = currentMonth === 0 ? currentYear - 1 : currentYear;
        return (
          (booking.status === "completed" || booking.status === "confirmed") &&
          bookingDate.getMonth() === lastMonth &&
          bookingDate.getFullYear() === year
        );
      })
      .reduce((acc, booking) => acc + booking.price, 0);

    const revenueChange =
      lastMonthRevenue > 0
        ? (
            ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) *
            100
          ).toFixed(1)
        : monthlyRevenue > 0
        ? 100
        : 0;

    // Get popular cars (most booked)
    const carBookingCounts = {};
    allBookings.forEach((booking) => {
      if (
        booking.car &&
        (booking.status === "completed" || booking.status === "confirmed")
      ) {
        const carId = booking.car._id.toString();
        if (!carBookingCounts[carId]) {
          carBookingCounts[carId] = {
            count: 0,
            car: booking.car,
          };
        }
        carBookingCounts[carId].count++;
      }
    });

    const popularCars = Object.values(carBookingCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map((item) => ({
        ...item.car.toObject(),
        bookings: item.count,
        rating: 4.5 + Math.random() * 0.5, // Mock rating for now
      }));

    // Calculate average rating (mock data for now)
    const averageRating = 4.8;

    // Monthly bookings data for chart (last 6 months)
    const monthlyBookings = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = date.getMonth();
      const year = date.getFullYear();

      const monthBookings = allBookings.filter((booking) => {
        const bookingDate = new Date(booking.createdAt);
        return (
          bookingDate.getMonth() === month && bookingDate.getFullYear() === year
        );
      }).length;

      monthlyBookings.push({
        month: date.toLocaleString("default", { month: "short" }),
        bookings: monthBookings,
      });
    }

    // Get recent bookings (last 5)
    const recentBookings = allBookings.slice(0, 5).map((booking) => ({
      ...booking.toObject(),
      user: booking.user
        ? {
            name: booking.user.name,
            email: booking.user.email,
          }
        : null,
    }));

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: allBookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      activeBookings: activeBookings.length,
      cancelledBookings: cancelledBookings.length,
      totalEarnings,
      monthlyRevenue,
      revenueChange: parseFloat(revenueChange),
      recentBookings,
      popularCars,
      averageRating,
      monthlyBookings,
      // Additional stats for cards
      stats: {
        earningsGrowth: revenueChange > 0 ? "up" : "down",
        bookingGrowth: 15, // Mock percentage for now
        customerSatisfaction: 92, // Mock percentage for now
        carUtilization:
          Math.round((activeBookings.length / cars.length) * 100) || 0,
      },
    };

    res.json({
      success: true,
      dashboardData,
      summary: {
        totalRevenue: `$${totalEarnings.toLocaleString()}`,
        monthlyGrowth: `${revenueChange}%`,
        activeCustomers: allBookings.reduce((acc, booking) => {
          if (booking.user && !acc.includes(booking.user._id.toString())) {
            acc.push(booking.user._id.toString());
          }
          return acc;
        }, []).length,
      },
    });
  } catch (error) {
    console.error("Error in getDashboardData controller:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// API to update user image
export const updateUserImage = async (req, res) => {
  try {
    const id = req.user._id;
    const imageFile = req.file;

    // Upload Image to Imagekit
    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    // For URL Generation, works for both images and videos
    // Optimization through imageKit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "400" }, // Width resizing
        { quality: "auto" }, // Auto compression
        { format: "webp" }, // Convert to modern format
      ],
    });

    const image = optimizedImageUrl;
    await User.findByIdAndUpdate(id, { image });

    res.json({ success: true, message: "Image Updated" });
  } catch (error) {
    console.log("Error in updateUserImage controller");
    res.json({ success: false, message: error.message });
  }
};
