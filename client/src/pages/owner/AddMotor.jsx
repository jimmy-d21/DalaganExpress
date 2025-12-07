import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Bike,
  Calendar,
  DollarSign,
  MapPin,
  Fuel,
  Settings,
  Type,
  FileText,
  CheckCircle,
  XCircle,
  Sparkles,
  Navigation,
  Gauge,
  Shield,
  Zap,
  Wind,
  Disc,
  User,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddMotor = () => {
  const { axios, currency, fetchMotors, motors } = useAppContext();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [motor, setMotor] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    engine_cc: "",
    pricePerDay: "",
    category: "",
    transmission: "",
    fuel_type: "",
    location: "",
    description: "",
  });

  // Motorcycle Categories
  const categories = [
    {
      value: "scooter",
      label: "Scooter",
      icon: "🛵",
      description: "Automatic, perfect for city rides",
    },
    {
      value: "underbone",
      label: "Underbone",
      icon: "🏍️",
      description: "Manual, lightweight",
    },
    {
      value: "big_bike",
      label: "Big Bike",
      icon: "🏍️🔥",
      description: "400cc+, adventure/touring",
    },
    {
      value: "sportbike",
      label: "Sport Bike",
      icon: "⚡",
      description: "High-performance, racing style",
    },
    {
      value: "cruiser",
      label: "Cruiser",
      icon: "🛣️",
      description: "Comfortable, long-distance",
    },
    {
      value: "naked",
      label: "Naked Bike",
      icon: "💨",
      description: "Standard, versatile",
    },
    {
      value: "adventure",
      label: "Adventure",
      icon: "🗺️",
      description: "Off-road capable",
    },
    {
      value: "electric",
      label: "Electric",
      icon: "🔋",
      description: "Zero emissions, quiet",
    },
  ];

  // Transmission Types for Motorcycles
  const transmissions = [
    { value: "Automatic", label: "Automatic (CVT)" },
    { value: "Manual", label: "Manual" },
    { value: "Semi-Automatic", label: "Semi-Automatic" },
    { value: "DCT", label: "Dual Clutch (DCT)" },
  ];

  // Fuel Types for Motorcycles
  const fuelTypes = [
    { value: "Gas", label: "Gasoline", icon: "⛽" },
    { value: "Premium", label: "Premium Gas", icon: "✨" },
    { value: "Diesel", label: "Diesel", icon: "🛢️" },
    { value: "Electric", label: "Electric", icon: "🔌" },
    { value: "Hybrid", label: "Hybrid", icon: "⚡⛽" },
  ];

  // Engine CC Options
  const engineSizes = [
    { value: "50", label: "50cc", type: "Scooter" },
    { value: "110", label: "110cc", type: "Entry Level" },
    { value: "125", label: "125cc", type: "Standard" },
    { value: "150", label: "150cc", type: "Popular" },
    { value: "200", label: "200cc", type: "Mid-range" },
    { value: "250", label: "250cc", type: "Beginner Big Bike" },
    { value: "400", label: "400cc", type: "Big Bike" },
    { value: "600", label: "600cc", type: "Super Sport" },
    { value: "750", label: "750cc+", type: "Heavy Duty" },
  ];

  // Negros Island Motorcycle-specific locations
  const negrosLocations = [
    {
      value: "Bacolod City Downtown",
      label: "Bacolod City Downtown",
      region: "Negros Occidental",
    },
    {
      value: "Lacson Street, Bacolod",
      label: "Lacson Street, Bacolod",
      region: "Negros Occidental",
    },
    {
      value: "Silay Heritage Area",
      label: "Silay Heritage Area",
      region: "Negros Occidental",
    },
    {
      value: "Talisay Beachfront",
      label: "Talisay Beachfront",
      region: "Negros Occidental",
    },
    {
      value: "Dumaguete Rizal Boulevard",
      label: "Dumaguete Rizal Boulevard",
      region: "Negros Oriental",
    },
    {
      value: "Silliman University Area",
      label: "Silliman University Area",
      region: "Negros Oriental",
    },
    {
      value: "Bago City Plaza",
      label: "Bago City Plaza",
      region: "Negros Occidental",
    },
    {
      value: "Kabankalan City Center",
      label: "Kabankalan City Center",
      region: "Negros Occidental",
    },
    {
      value: "Mambukal Resort Area",
      label: "Mambukal Resort Area",
      region: "Negros Occidental",
    },
    {
      value: "The Ruins Area",
      label: "The Ruins Area",
      region: "Negros Occidental",
    },
    {
      value: "Punta Taytay, Bacolod",
      label: "Punta Taytay, Bacolod",
      region: "Negros Occidental",
    },
    { value: "Other Negros Location", label: "Other Location in Negros" },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = () => {
    // Validate current step
    if (
      formStep === 1 &&
      (!motor.brand || !motor.model || !motor.year || !image)
    ) {
      toast.error("Please fill in all required fields in Step 1");
      return;
    }
    if (
      formStep === 2 &&
      (!motor.engine_cc ||
        !motor.category ||
        !motor.transmission ||
        !motor.fuel_type)
    ) {
      toast.error("Please fill in all required fields in Step 2");
      return;
    }
    setFormStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setFormStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!image) {
      toast.error("Please upload a motorcycle image");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("motorData", JSON.stringify(motor));

      const { data } = await axios.post("/api/motor/owner/add-motor", formData);

      if (data.success) {
        toast.success("🏍️ Motorcycle listed successfully!");
        resetForm();
        fetchMotors();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setImage(null);
    setImagePreview(null);
    setFormStep(1);
    setMotor({
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      engine_cc: "",
      pricePerDay: "",
      category: "",
      transmission: "",
      fuel_type: "",
      location: "",
      description: "",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6"
    >
      {/* Header with Motorcycle theme */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
                <Bike className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Add New Motorcycle
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  🏝️ List your motorcycle for rent in beautiful Negros Island
                </p>
              </div>
            </div>
            <p className="text-gray-600 max-w-2xl">
              Fill in details to list a new motorcycle for booking. Perfect for
              tourists wanting to explore Negros Island!
              <span className="text-orange-600 font-medium ml-2">
                Ride through Negros in style!
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium transition-all duration-300 ${
                  formStep >= step
                    ? "bg-gradient-to-r from-red-500 to-orange-500 border-transparent text-white"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`w-24 h-1 transition-all duration-300 ${
                    formStep > step
                      ? "bg-gradient-to-r from-red-500 to-orange-500"
                      : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span className={formStep === 1 ? "text-red-600 font-medium" : ""}>
            Basic Info
          </span>
          <span className={formStep === 2 ? "text-red-600 font-medium" : ""}>
            Specifications
          </span>
          <span className={formStep === 3 ? "text-red-600 font-medium" : ""}>
            Location & Details
          </span>
        </div>
      </div>

      <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto">
        <motion.div
          key={formStep}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
        >
          {/* Step 1: Basic Information */}
          {formStep === 1 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Basic Information
                </h2>
                <p className="text-gray-600">Tell us about your motorcycle</p>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Motorcycle Photos <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    onClick={() =>
                      document.getElementById("motor-image").click()
                    }
                    className="relative group cursor-pointer"
                  >
                    <div
                      className={`aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-300 ${
                        imagePreview
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-red-400 hover:bg-red-50"
                      }`}
                    >
                      {imagePreview ? (
                        <>
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-xl"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                            <Upload className="w-8 h-8 text-white" />
                          </div>
                        </>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-gray-400 mb-3" />
                          <p className="text-gray-600 font-medium">
                            Upload Motorcycle Photo
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Click or drag & drop
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            Recommended: 1200x800px
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      id="motor-image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
                      <Sparkles className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Photo Tips for Motorcycles
                        </p>
                        <p className="text-xs text-gray-600">
                          Show your motorcycle with beautiful Negros
                          backgrounds!
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Best Angles for Motorcycles
                        </p>
                        <p className="text-xs text-gray-600">
                          Include side view, front, and engine close-ups
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand & Model */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Bike className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g., Honda, Yamaha, Kawasaki..."
                      value={motor.brand}
                      onChange={(e) =>
                        setMotor({ ...motor, brand: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g., Aerox 155, Click 125, NMAX..."
                      value={motor.model}
                      onChange={(e) =>
                        setMotor({ ...motor, model: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Year & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      placeholder="2025"
                      min="2000"
                      max={new Date().getFullYear() + 1}
                      value={motor.year}
                      onChange={(e) =>
                        setMotor({ ...motor, year: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Price ({currency}){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      placeholder="300"
                      min="1"
                      value={motor.pricePerDay}
                      onChange={(e) =>
                        setMotor({ ...motor, pricePerDay: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                      / day
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Specifications */}
          {formStep === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Specifications
                </h2>
                <p className="text-gray-600">
                  Define your motorcycle's features and capabilities
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Engine CC */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Engine Size (cc) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {engineSizes.map((size) => (
                      <button
                        key={size.value}
                        type="button"
                        onClick={() =>
                          setMotor({ ...motor, engine_cc: size.value })
                        }
                        className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                          motor.engine_cc === size.value
                            ? "border-red-500 bg-red-50 text-red-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <Gauge className="w-5 h-5 mb-1" />
                        <span className="font-bold text-lg">{size.label}</span>
                        <span className="text-xs text-gray-500">
                          {size.type}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() =>
                          setMotor({ ...motor, category: cat.value })
                        }
                        className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                          motor.category === cat.value
                            ? "border-red-500 bg-red-50 text-red-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <span className="text-2xl mb-1">{cat.icon}</span>
                        <span className="font-medium text-sm text-center">
                          {cat.label}
                        </span>
                        <span className="text-xs text-gray-500 text-center mt-1">
                          {cat.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Transmission <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {transmissions.map((trans) => (
                      <button
                        key={trans.value}
                        type="button"
                        onClick={() =>
                          setMotor({ ...motor, transmission: trans.value })
                        }
                        className={`flex items-center justify-between w-full p-3 rounded-lg border transition-all ${
                          motor.transmission === trans.value
                            ? "border-red-500 bg-red-50 text-red-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Settings className="w-4 h-4" />
                          <span className="font-medium">{trans.label}</span>
                        </div>
                        {trans.value === "Automatic" && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Popular
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Fuel Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {fuelTypes.map((fuel) => (
                      <button
                        key={fuel.value}
                        type="button"
                        onClick={() =>
                          setMotor({ ...motor, fuel_type: fuel.value })
                        }
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                          motor.fuel_type === fuel.value
                            ? "border-red-500 bg-red-50 text-red-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{fuel.icon}</span>
                          <span className="font-medium text-sm">
                            {fuel.label}
                          </span>
                        </div>
                        <Fuel className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Final Details */}
          {formStep === 3 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Location & Details
                </h2>
                <p className="text-gray-600">
                  Specify your motorcycle's location in Negros Island
                </p>
              </div>

              {/* Location - Negros Specific */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Pickup Location in Negros Island{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g., Near SM City Bacolod, Lacson Street"
                      value={motor.location}
                      onChange={(e) =>
                        setMotor({ ...motor, location: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Popular Negros Motorcycle Locations */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Popular motorcycle pickup locations in Negros:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {negrosLocations.slice(0, 8).map((loc) => (
                        <button
                          key={loc.value}
                          type="button"
                          onClick={() =>
                            setMotor({ ...motor, location: loc.value })
                          }
                          className={`flex flex-col items-center p-2 rounded-lg border transition-all text-center ${
                            motor.location === loc.value
                              ? "border-red-500 bg-red-50 text-red-700"
                              : "border-gray-200 hover:border-gray-300 text-gray-700"
                          }`}
                        >
                          <MapPin className="w-4 h-4 mb-1" />
                          <span className="text-xs font-medium">
                            {loc.label}
                          </span>
                          {loc.region && (
                            <span className="text-xs text-gray-500">
                              {loc.region}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* More locations dropdown */}
                    <div className="mt-3">
                      <select
                        value={motor.location}
                        onChange={(e) =>
                          setMotor({ ...motor, location: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      >
                        <option value="">
                          Or select from all Negros locations...
                        </option>
                        {negrosLocations.map((loc) => (
                          <option key={loc.value} value={loc.value}>
                            {loc.label} {loc.region && `- ${loc.region}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    rows={6}
                    placeholder="Describe your motorcycle's features, condition, and any special accessories. Include details about:
                    • Perfect for exploring Negros tourist spots (Mambukal, beaches)
                    • Suitable for mountain roads and coastal highways
                    • Safety equipment included (helmet, etc.)
                    • Fuel efficiency and riding comfort
                    • Any custom modifications or special features"
                    value={motor.description}
                    onChange={(e) =>
                      setMotor({ ...motor, description: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Tip: Mention if your motorcycle is suitable for Negros roads
                  and tourist destinations.
                </p>
              </div>

              {/* Preview Card with Motorcycle theme */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Listing Preview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border-2 border-white shadow-md"
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {motor.brand || "Brand"} {motor.model || "Model"}
                    </h4>
                    <div className="space-y-2">
                      <p className="text-gray-600">{motor.year || "Year"}</p>
                      <p className="text-2xl font-bold text-red-600">
                        {currency}
                        {motor.pricePerDay || "0"}/day
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/80 text-gray-700 rounded-full text-sm">
                          {motor.engine_cc || "0"}cc
                        </span>
                        <span className="px-3 py-1 bg-white/80 text-gray-700 rounded-full text-sm">
                          {motor.category || "Category"}
                        </span>
                        <span className="px-3 py-1 bg-white/80 text-gray-700 rounded-full text-sm">
                          {motor.transmission || "Transmission"}
                        </span>
                      </div>
                      {motor.location && (
                        <div className="flex items-center gap-2 mt-3 text-gray-700">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span className="font-medium">{motor.location}</span>
                          <span className="text-sm text-gray-500">
                            • Negros Island
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            {formStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
              >
                ← Previous Step
              </button>
            ) : (
              <div></div>
            )}

            {formStep < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                Next Step →
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Clear All
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Listing Your Motorcycle...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>List Motorcycle in Negros</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </form>

      {/* Quick Tips for Motorcycle Rentals in Negros */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
          <div className="flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                🏍️ Tips for Successful Motorcycle Listings in Negros
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Safety First:</strong> Include helmet and safety
                    gear availability
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Negros-Ready:</strong> Mention if suitable for
                    Negros mountain roads and coastal highways
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Fuel Efficiency:</strong> Highlight km/liter for
                    Negros tourism routes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Popular Routes:</strong> Suggest routes to Mambukal,
                    The Ruins, beaches
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Weather Ready:</strong> Mention if suitable for
                    Negros weather (rain/heat)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AddMotor;
