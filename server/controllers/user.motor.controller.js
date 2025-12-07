import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Motor from "../models/Motor.js";

// Generate JWT Token
const generateToken = (userId) => {
  const payload = userId;
  return jwt.sign(payload, process.env.JWT_SECRET);
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return res.json({ success: false, message: "Fill all the fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());
    res.json({ success: true, token });
  } catch (error) {
    console.log("Error in registerUser controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = generateToken(user._id.toString());
    res.json({ success: true, token });
  } catch (error) {
    console.log("Error in loginUser controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User data using Token (JWT)
export const getUserData = async (req, res) => {
  try {
    const { user } = req;

    // Populate favorites with motor details
    const userWithFavorites = await User.findById(user._id)
      .select("-password")
      .populate({
        path: "favorites.motor",
        select: "brand model image pricePerDay engine_cc category",
      });

    res.json({ success: true, user: userWithFavorites });
  } catch (error) {
    console.log("Error in getUserData controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllMotors = async (req, res) => {
  try {
    const motors = await Motor.find({ isAvailable: true }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      motors,
    });
  } catch (error) {
    console.error("Error in getAllMotors controller:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add motor to favorites
export const addToFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    const { motorId } = req.body;

    // Validate input
    if (!motorId) {
      return res.status(400).json({
        success: false,
        message: "Motor ID is required",
      });
    }

    // Check if motor exists
    const motor = await Motor.findById(motorId);
    if (!motor) {
      return res.status(404).json({
        success: false,
        message: "Motor not found",
      });
    }

    // Check if already in favorites
    const user = await User.findById(userId);
    const alreadyFavorite = user.favorites.some(
      (fav) => fav.motor.toString() === motorId
    );

    if (alreadyFavorite) {
      return res.json({
        success: true,
        message: "Motor already in favorites",
        user,
      });
    }

    // Add to favorites
    user.favorites.push({ motor: motorId });
    await user.save();

    // Populate the updated user
    const updatedUser = await User.findById(userId)
      .select("-password")
      .populate({
        path: "favorites.motor",
        select: "brand model image pricePerDay engine_cc category",
      });

    res.json({
      success: true,
      message: "Added to favorites",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in addToFavorites controller:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Remove motor from favorites
export const removeFromFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    const { motorId } = req.body;

    // Validate input
    if (!motorId) {
      return res.status(400).json({
        success: false,
        message: "Motor ID is required",
      });
    }

    // Remove from favorites
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: { motor: motorId } } },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Populate the updated user
    const updatedUser = await User.findById(userId)
      .select("-password")
      .populate({
        path: "favorites.motor",
        select: "brand model image pricePerDay engine_cc category",
      });

    res.json({
      success: true,
      message: "Removed from favorites",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in removeFromFavorites controller:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Get user's favorite motors
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("favorites").populate({
      path: "favorites.motor",
      select:
        "brand model image pricePerDay engine_cc category fuel_type transmission location year isAvailable",
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Extract only the motor details
    const favoriteMotors = user.favorites
      .map((fav) => fav.motor)
      .filter((motor) => motor !== null);

    res.json({
      success: true,
      favorites: favoriteMotors,
    });
  } catch (error) {
    console.error("Error in getFavorites controller:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
