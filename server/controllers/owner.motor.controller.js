import fs from "fs";
import Motor from "../models/Motor.js";

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
export const toggleCarAvailability = async (req, res) => {
  try {
    const id = req.user._id;
    const { motorId } = req.body;

    const motor = await Motor.findById(motorId);

    // Checking is car belongs to the user
    if (motor.owner.toString() !== id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    motor.isAvailable = !motor.isAvailable;
    await motor.save();

    res.json({ success: true, message: "Availability Toggled" });
  } catch (error) {
    console.log("Error in toggleCarAvailability controller");
    res.json({ success: false, message: error.message });
  }
};
