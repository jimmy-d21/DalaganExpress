import fs from "fs";
import Motor from "../models/Motor.js";
import Booking from "../models/booking.motor.model.js";
import User from "../models/User.js";
import imagekit from "../configs/imageKit.js";

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

// API to Add Motor
export const addMotor = async (req, res) => {
  try {
    const id = req.user._id;
    let motor = JSON.parse(req.body.motorData);
    const imageFile = req.file;

    if (!imageFile) {
      return res.json({ success: false, message: "Image is required" });
    }

    // Read uploaded image from temp folder
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/motors",
    });

    // Generate Optimized URL
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    const image = optimizedImageUrl;

    // Save motor into database
    await Motor.create({ ...motor, owner: id, image });

    res.json({ success: true, message: "Motor Added" });
  } catch (error) {
    console.log("Error in addMotor controller:", error);
    res.json({ success: false, message: error.message });
  }
};

// API to List Owner Motor
export const getOwnerMotors = async (req, res) => {
  try {
    const id = req.user._id;
    const motors = await Motor.find({ owner: id });

    res.json({ success: true, motors });
  } catch (error) {
    console.log("Error in getOwnerCars controller");
    res.json({ success: false, message: error.message });
  }
};

// API to Toggle Motor Availability
export const toggleMotorAvailability = async (req, res) => {
  try {
    const id = req.user._id;
    const { motorId } = req.body;

    const motor = await Motor.findById(motorId);

    if (!motor) {
      return res.json({ message: "Motor not Found!" });
    }

    // Checking is car belongs to the user
    if (motor.owner.toString() !== id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    motor.isAvailable = !motor.isAvailable;
    await motor.save();

    res.json({
      success: true,
      message: "Availability Toggled",
      updatedMotor: motor,
    });
  } catch (error) {
    console.log("Error in toggleCarAvailability controller");
    res.json({ success: false, message: error.message });
  }
};

// API to Delete a Motor
export const deleteMotor = async (req, res) => {
  try {
    const id = req.user._id;
    const { motorId } = req.body;

    const motor = await Motor.findById(motorId);

    // Checking is car belongs to the user
    if (motor.owner.toString() !== id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    motor.owner = null; // removed the owner for cardata
    motor.isAvailable = false; // it will not available it can't delete this data because if someone book this car it will display in booking history just remove the owner from this car

    await motor.save();

    res.json({ success: true, message: "Car Removed" });
  } catch (error) {
    console.log("Error in deleteCar controller");
    res.json({ success: false, message: error.message });
  }
};

// API to get Dashboard Data (Motor Version) - Fixed
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.json({ success: false, message: "Unauthorized" });
    }

    // Current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Fetch all motors from owner
    const motors = await Motor.find({ owner: _id });

    // Fetch all bookings related to the owner
    const allBookings = await Booking.find({ owner: _id })
      .populate("motor")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    // Booking filters
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

    // Active (confirmed and ongoing)
    const activeBookings = allBookings.filter(
      (b) => b.status === "confirmed" && new Date(b.returnDate) >= currentDate
    );

    // Helper function to get booking amount
    const getBookingAmount = (booking) => {
      if (booking.totalPrice) return booking.totalPrice;
      if (booking.price) return booking.price;
      if (booking.motor?.pricePerDay) {
        const pickup = new Date(booking.pickupDate);
        const returnDate = new Date(booking.returnDate);
        const diffTime = Math.abs(returnDate - pickup);
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return booking.motor.pricePerDay * days;
      }
      return 0;
    };

    // Total Earnings (completed + confirmed)
    const totalEarnings = allBookings
      .filter(
        (booking) =>
          booking.status === "completed" || booking.status === "confirmed"
      )
      .reduce((acc, booking) => acc + getBookingAmount(booking), 0);

    // Monthly Revenue (this month only - completed bookings)
    const monthlyRevenue = allBookings
      .filter((booking) => {
        const bookingDate = new Date(booking.createdAt);
        return (
          booking.status === "completed" &&
          bookingDate.getMonth() === currentMonth &&
          bookingDate.getFullYear() === currentYear
        );
      })
      .reduce((acc, booking) => acc + getBookingAmount(booking), 0);

    // Last month's revenue
    const lastMonthRevenue = allBookings
      .filter((booking) => {
        const bookingDate = new Date(booking.createdAt);
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const year = currentMonth === 0 ? currentYear - 1 : currentYear;

        return (
          booking.status === "completed" &&
          bookingDate.getMonth() === lastMonth &&
          bookingDate.getFullYear() === year
        );
      })
      .reduce((acc, booking) => acc + getBookingAmount(booking), 0);

    const revenueChange =
      lastMonthRevenue > 0
        ? (
            ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) *
            100
          ).toFixed(1)
        : monthlyRevenue > 0
        ? 100
        : 0;

    // Popular Motors (most booked)
    const motorBookingCounts = {};
    allBookings.forEach((booking) => {
      if (
        booking.motor &&
        (booking.status === "completed" || booking.status === "confirmed")
      ) {
        const motorId = booking.motor._id.toString();
        if (!motorBookingCounts[motorId]) {
          motorBookingCounts[motorId] = {
            count: 0,
            motor: booking.motor,
          };
        }
        motorBookingCounts[motorId].count++;
      }
    });

    const popularMotors = Object.values(motorBookingCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map((item) => ({
        _id: item.motor._id,
        brand: item.motor.brand,
        model: item.motor.model,
        image: item.motor.image,
        pricePerDay: item.motor.pricePerDay,
        category: item.motor.category,
        bookings: item.count,
        rating: 4.5 + Math.random() * 0.5,
      }));

    // Mock average rating for dashboard
    const averageRating = 4.7;

    // Monthly Bookings (Chart: last 6 months)
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

    // Last 5 recent bookings
    const recentBookings = allBookings.slice(0, 5).map((booking) => {
      const bookingAmount = getBookingAmount(booking);
      return {
        ...booking.toObject(),
        price: bookingAmount, // Add price field for frontend compatibility
        totalPrice: bookingAmount,
        user: booking.user
          ? {
              name: booking.user.name,
              email: booking.user.email,
            }
          : null,
      };
    });

    // Dashboard Response
    const dashboardData = {
      totalMotors: motors.length,
      totalBookings: allBookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      activeBookings: activeBookings.length,
      cancelledBookings: cancelledBookings.length,

      totalEarnings,
      monthlyRevenue,
      revenueChange: parseFloat(revenueChange),

      recentBookings,
      popularMotors,
      averageRating,
      monthlyBookings,

      // Stats for cards
      stats: {
        earningsGrowth: revenueChange > 0 ? "up" : "down",
        bookingGrowth: 12,
        customerSatisfaction: 93,
        motorUtilization:
          Math.round((activeBookings.length / (motors.length || 1)) * 100) || 0,
      },
    };

    res.json({
      success: true,
      dashboardData,
      summary: {
        totalRevenue: `${currency}${totalEarnings.toLocaleString()}`,
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
