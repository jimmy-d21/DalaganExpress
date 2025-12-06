import fs from "fs";
import Motor from "../models/motorModel.js"; // <-- update the import

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
