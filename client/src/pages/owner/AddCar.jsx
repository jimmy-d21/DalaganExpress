import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Car,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  Fuel,
  Settings,
  Type,
  FileText,
  CheckCircle,
  XCircle,
  Sparkles,
  Navigation,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddCar = () => {
  const { axios, currency, fecthCars } = useAppContext();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    pricePerDay: "",
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: "",
    location: "",
    description: "",
  });

  const categories = [
    { value: "Sedan", label: "Sedan", icon: "🚗" },
    { value: "SUV", label: "SUV", icon: "🚙" },
    { value: "Van", label: "Van", icon: "🚐" },
    { value: "Convertible", label: "Convertible", icon: "🏎️" },
    { value: "Coupe", label: "Coupe", icon: "🚓" },
    { value: "Hatchback", label: "Hatchback", icon: "🚗" },
    { value: "Pickup", label: "Pickup Truck", icon: "🛻" },
    { value: "Motorcycle", label: "Motorcycle", icon: "🏍️" },
  ];

  const transmissions = [
    { value: "Automatic", label: "Automatic" },
    { value: "Manual", label: "Manual" },
    { value: "Semi-Automatic", label: "Semi-Automatic" },
  ];

  const fuelTypes = [
    { value: "Gas", label: "Gasoline" },
    { value: "Diesel", label: "Diesel" },
    { value: "Petrol", label: "Petrol" },
    { value: "Electric", label: "Electric" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Plug-in Hybrid", label: "Plug-in Hybrid" },
  ];

  // Negros and Bacolod specific locations
  const negrosLocations = [
    {
      value: "Bacolod City",
      label: "Bacolod City",
      region: "Negros Occidental",
    },
    { value: "Silay City", label: "Silay City", region: "Negros Occidental" },
    {
      value: "Talisay City",
      label: "Talisay City",
      region: "Negros Occidental",
    },
    { value: "Bago City", label: "Bago City", region: "Negros Occidental" },
    {
      value: "Dumaguete City",
      label: "Dumaguete City",
      region: "Negros Oriental",
    },
    {
      value: "Kabankalan City",
      label: "Kabankalan City",
      region: "Negros Occidental",
    },
    {
      value: "San Carlos City",
      label: "San Carlos City",
      region: "Negros Occidental",
    },
    {
      value: "Victorias City",
      label: "Victorias City",
      region: "Negros Occidental",
    },
    { value: "Cadiz City", label: "Cadiz City", region: "Negros Occidental" },
    {
      value: "Sipalay City",
      label: "Sipalay City",
      region: "Negros Occidental",
    },
    { value: "Hinigaran", label: "Hinigaran", region: "Negros Occidental" },
    { value: "Valladolid", label: "Valladolid", region: "Negros Occidental" },
    { value: "Pulupandan", label: "Pulupandan", region: "Negros Occidental" },
    { value: "Other Negros Location", label: "Other Location in Negros" },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
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
    if (formStep === 1 && (!car.brand || !car.model || !car.year || !image)) {
      toast.error("Please fill in all required fields in Step 1");
      return;
    }
    if (
      formStep === 2 &&
      (!car.category ||
        !car.transmission ||
        !car.fuel_type ||
        !car.seating_capacity)
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
      toast.error("Please upload a car image");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));

      const { data } = await axios.post("/api/owner/add-car", formData);

      if (data.success) {
        toast.success("🎉 Car listed successfully!");
        resetForm();
        fecthCars();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add car. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setImage(null);
    setImagePreview(null);
    setFormStep(1);
    setCar({
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      pricePerDay: "",
      category: "",
      transmission: "",
      fuel_type: "",
      seating_capacity: "",
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
      {/* Header with Negros theme */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Add New Car
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  🏝️ List your car for rent in beautiful Negros Island
                </p>
              </div>
            </div>
            <p className="text-gray-600 max-w-2xl">
              Fill in details to list a new car for booking, including pricing,
              availability, and car specifications.
              <span className="text-blue-600 font-medium ml-2">
                Serving all of Negros Island!
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
                    ? "bg-gradient-to-r from-blue-500 to-green-500 border-transparent text-white"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`w-24 h-1 transition-all duration-300 ${
                    formStep > step
                      ? "bg-gradient-to-r from-blue-500 to-green-500"
                      : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span className={formStep === 1 ? "text-blue-600 font-medium" : ""}>
            Basic Info
          </span>
          <span className={formStep === 2 ? "text-blue-600 font-medium" : ""}>
            Specifications
          </span>
          <span className={formStep === 3 ? "text-blue-600 font-medium" : ""}>
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
                <p className="text-gray-600">Tell us about your car</p>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Car Photos <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    onClick={() => document.getElementById("car-image").click()}
                    className="relative group cursor-pointer"
                  >
                    <div
                      className={`aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-300 ${
                        imagePreview
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
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
                            Upload Car Photo
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
                      id="car-image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                      <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Photo Tips for Negros
                        </p>
                        <p className="text-xs text-gray-600">
                          Show your car with beautiful Negros backgrounds!
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Best Practices
                        </p>
                        <p className="text-xs text-gray-600">
                          Include interior, exterior, and dashboard shots
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
                    <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g., Toyota, Mitsubishi, Honda..."
                      value={car.brand}
                      onChange={(e) =>
                        setCar({ ...car, brand: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                      placeholder="e.g., Fortuner, Montero, Vios..."
                      value={car.model}
                      onChange={(e) =>
                        setCar({ ...car, model: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                      value={car.year}
                      onChange={(e) => setCar({ ...car, year: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                      placeholder="1000"
                      min="1"
                      value={car.pricePerDay}
                      onChange={(e) =>
                        setCar({ ...car, pricePerDay: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  Define your car's features and capabilities
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        onClick={() => setCar({ ...car, category: cat.value })}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                          car.category === cat.value
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <span className="text-lg">{cat.icon}</span>
                        <span className="font-medium text-sm">{cat.label}</span>
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
                          setCar({ ...car, transmission: trans.value })
                        }
                        className={`flex items-center justify-between w-full p-3 rounded-lg border transition-all ${
                          car.transmission === trans.value
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <span className="font-medium">{trans.label}</span>
                        <Settings className="w-4 h-4" />
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
                          setCar({ ...car, fuel_type: fuel.value })
                        }
                        className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                          car.fuel_type === fuel.value
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <Fuel className="w-4 h-4" />
                        <span className="font-medium text-sm">
                          {fuel.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seating Capacity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seating Capacity <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      placeholder="4"
                      min="1"
                      max="12"
                      value={car.seating_capacity}
                      onChange={(e) =>
                        setCar({ ...car, seating_capacity: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                      seats
                    </div>
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
                  Specify your car's location in Negros Island
                </p>
              </div>

              {/* Location - Negros Specific */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Location in Negros Island{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g., Lacson Street, Bacolod City"
                      value={car.location}
                      onChange={(e) =>
                        setCar({ ...car, location: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Popular Negros Locations */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Popular locations in Negros:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {negrosLocations.slice(0, 8).map((loc) => (
                        <button
                          key={loc.value}
                          type="button"
                          onClick={() =>
                            setCar({ ...car, location: loc.value })
                          }
                          className={`flex flex-col items-center p-2 rounded-lg border transition-all text-center ${
                            car.location === loc.value
                              ? "border-blue-500 bg-blue-50 text-blue-700"
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
                        value={car.location}
                        onChange={(e) =>
                          setCar({ ...car, location: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    placeholder="Describe your car's features, condition, and any special amenities. Include details about:
                    • Perfect for exploring Negros tourist spots
                    • Ideal for trips to Mambukal, The Ruins, or beaches
                    • Suitable for Negros mountain roads
                    • Any special features for island travel"
                    value={car.description}
                    onChange={(e) =>
                      setCar({ ...car, description: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Tip: Mention if your car is suitable for Negros roads and
                  tourist destinations.
                </p>
              </div>

              {/* Preview Card with Negros theme */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
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
                      {car.brand || "Brand"} {car.model || "Model"}
                    </h4>
                    <div className="space-y-2">
                      <p className="text-gray-600">{car.year || "Year"}</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {currency}
                        {car.pricePerDay || "0"}/day
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/80 text-gray-700 rounded-full text-sm">
                          {car.category || "Category"}
                        </span>
                        <span className="px-3 py-1 bg-white/80 text-gray-700 rounded-full text-sm">
                          {car.transmission || "Transmission"}
                        </span>
                        <span className="px-3 py-1 bg-white/80 text-gray-700 rounded-full text-sm">
                          {car.seating_capacity || "4"} seats
                        </span>
                      </div>
                      {car.location && (
                        <div className="flex items-center gap-2 mt-3 text-gray-700">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span className="font-medium">{car.location}</span>
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
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
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
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Listing Your Car...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>List Car in Negros</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </form>

      {/* Quick Tips for Negros */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                💡 Tips for Successful Listings in Negros
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Negros-Ready:</strong> Mention if your car is
                    suitable for Negros mountain roads and tourist destinations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Island Travel:</strong> Highlight if your car is
                    good for island hopping or long drives
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Local Features:</strong> Mention AC performance
                    (important for Negros weather)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Price Competitively:</strong> Check similar cars in
                    Bacolod/Dumaguete for pricing
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>
                    <strong>Clear Photos:</strong> Show your car with beautiful
                    Negros backgrounds to attract tourists
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

export default AddCar;
