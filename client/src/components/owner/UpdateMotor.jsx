// pages/owner/UpdateMotor.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  Bike,
  ArrowLeft,
  Save,
  Upload,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import LoadingScreen from "../../components/LoadingScreen";

const UpdateMotor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axios, fetchMotors } = useAppContext();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    engine_cc: "",
    category: "scooter",
    fuel_type: "gasoline",
    transmission: "automatic",
    pricePerDay: "",
    location: "",
    description: "",
  });

  const categories = [
    "scooter",
    "underbone",
    "big_bike",
    "sportbike",
    "cruiser",
    "naked",
    "adventure",
    "electric",
  ];

  const fuelTypes = ["gasoline", "diesel", "electric"];
  const transmissions = ["automatic", "manual"];

  useEffect(() => {
    fetchMotorDetails();
  }, [id]);

  const fetchMotorDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/motor/owner/motors`);
      if (data.success) {
        const motor = data.motors.find((m) => m._id === id);
        if (motor) {
          setFormData({
            brand: motor.brand || "",
            model: motor.model || "",
            year: motor.year || new Date().getFullYear(),
            engine_cc: motor.engine_cc || "",
            category: motor.category || "scooter",
            fuel_type: motor.fuel_type || "gasoline",
            transmission: motor.transmission || "automatic",
            pricePerDay: motor.pricePerDay || "",
            location: motor.location || "",
            description: motor.description || "",
          });
          setImagePreview(motor.image || "");
        } else {
          toast.error("Motorcycle not found");
          navigate("/owner/manage-motors");
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load motorcycle details"
      );
      navigate("/owner/manage-motors");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "year" || name === "engine_cc" || name === "pricePerDay"
          ? value.replace(/\D/g, "")
          : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Append form data
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Append image if selected
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const { data } = await axios.put(
        `/api/motor/owner/update-motor/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Motorcycle updated successfully!");
        fetchMotors();
        navigate("/owner/manage-motors");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/owner/manage-motors")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Update Motorcycle
              </h1>
              <p className="text-gray-600 mt-1">
                Modify your motorcycle details and images
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Image Upload */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Motorcycle Image
                </h2>

                {/* Image Preview */}
                <div className="mb-4">
                  <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Motorcycle preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <Bike className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="text-gray-500 text-sm">
                          No image selected
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Button */}
                <label className="block">
                  <div className="cursor-pointer w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload New Image
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                <p className="text-xs text-gray-500 mt-2 text-center">
                  JPG, PNG, or WebP. Max 5MB
                </p>
              </div>
            </div>

            {/* Right Column - Form Fields */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Bike className="w-5 h-5" />
                  Motorcycle Details
                </h2>

                <div className="space-y-6">
                  {/* Brand & Model */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brand *
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="e.g., Honda, Yamaha"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Model *
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="e.g., Aerox 155, Click 125"
                      />
                    </div>
                  </div>

                  {/* Year & Engine */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year *
                      </label>
                      <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Engine Size (cc) *
                      </label>
                      <input
                        type="number"
                        name="engine_cc"
                        value={formData.engine_cc}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="e.g., 125, 150, 400"
                      />
                    </div>
                  </div>

                  {/* Category & Fuel Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fuel Type *
                      </label>
                      <select
                        name="fuel_type"
                        value={formData.fuel_type}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      >
                        {fuelTypes.map((type) => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Transmission & Price */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transmission *
                      </label>
                      <select
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      >
                        {transmissions.map((trans) => (
                          <option key={trans} value={trans}>
                            {trans.charAt(0).toUpperCase() + trans.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Per Day (₱) *
                      </label>
                      <input
                        type="number"
                        name="pricePerDay"
                        value={formData.pricePerDay}
                        onChange={handleChange}
                        required
                        min="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="e.g., 500"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="e.g., Bacolod City, Negros Occidental"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                      placeholder="Describe your motorcycle's features, condition, and any special details..."
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => navigate("/owner/manage-motors")}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          <span>Update Motorcycle</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default UpdateMotor;
