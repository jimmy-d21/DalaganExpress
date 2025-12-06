import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bike,
  MapPin,
  Gauge,
  Fuel,
  Calendar,
  Clock,
  Shield,
  Navigation,
  Wifi,
  Music,
  Bell,
  Star,
  CreditCard,
  CheckCircle,
  Cog,
  Wind,
  Zap,
  ExternalLink,
  HardHat,
  Sparkles,
  Award,
  Radio,
  ThermometerSun,
  Key,
  Lock,
  AlertCircle,
  User,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const MotorDetails = () => {
  const { id } = useParams();
  const [motor, setMotor] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("main-office");
  const [rentalDays, setRentalDays] = useState(1);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    motors,
    currency,
    axios,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    navigate,
  } = useAppContext();

  // Motorcycle pickup locations in Negros
  const pickupLocations = [
    {
      id: "main-office",
      name: "Bacolod Main Hub",
      address: "Lacson Street, Bacolod City",
      lat: 10.6407,
      lng: 122.9687,
      features: ["24/7 Support", "Free Parking", "Helmet Check", "Quick Wash"],
      googleMapsUrl: "https://www.google.com/maps?q=10.6407,122.9687",
      description: "Central location with full motorcycle services",
    },
    {
      id: "airport",
      name: "Bacolod-Silay Airport",
      address: "Bacolod-Silay Airport, Silay City",
      lat: 10.7667,
      lng: 122.9667,
      features: ["Airport Pickup", "Tourist Info", "Gear Rental", "Shuttle"],
      googleMapsUrl: "https://www.google.com/maps?q=10.7667,122.9667",
      description: "Perfect for arriving tourists",
    },
    {
      id: "dumaguete",
      name: "Dumaguete Seaside",
      address: "Rizal Boulevard, Dumaguete City",
      lat: 9.3109,
      lng: 123.3077,
      features: [
        "Beach Access",
        "Tour Guides",
        "Cafe Nearby",
        "Secure Parking",
      ],
      googleMapsUrl: "https://www.google.com/maps?q=9.3109,123.3077",
      description: "Scenic location near the beach",
    },
    {
      id: "mambukal",
      name: "Mambukal Resort Gate",
      address: "Mambukal, Murcia",
      lat: 10.603,
      lng: 123.134,
      features: [
        "Mountain Access",
        "Tour Packages",
        "Emergency Kit",
        "Guide Service",
      ],
      googleMapsUrl: "https://www.google.com/maps?q=10.603,123.134",
      description: "Gateway to Negros mountain adventures",
    },
  ];

  // Fallback images for motorcycle locations
  const fallbackMapImages = {
    "main-office":
      "https://images.unsplash.com/photo-1558980664-10e7170b5df9?auto=format&fit=crop&w=1200&q=80",
    airport:
      "https://images.unsplash.com/photo-1588797697582-efef1e0b1b13?auto=format&fit=crop&w=1200&q=80",
    dumaguete:
      "https://images.unsplash.com/photo-1558981285-501cd9af9426?auto=format&fit=crop&w=1200&q=80",
    mambukal:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
  };

  // Motorcycle-specific features
  const features = [
    {
      id: "helmet",
      name: "Premium Helmet",
      icon: <HardHat className="w-5 h-5" />,
      price: 5,
      description: "Full-face helmet with Bluetooth",
    },
    {
      id: "insurance",
      name: "Full Coverage Insurance",
      icon: <Shield className="w-5 h-5" />,
      price: 10,
      description: "Accident and theft protection",
    },
    {
      id: "gps",
      name: "Adventure GPS",
      icon: <Navigation className="w-5 h-5" />,
      price: 8,
      description: "Off-road maps and routes",
    },
    {
      id: "jacket",
      name: "Riding Jacket",
      icon: <User className="w-5 h-5" />,
      price: 7,
      description: "Protective riding gear",
    },
    {
      id: "actioncam",
      name: "Action Camera",
      icon: <Radio className="w-5 h-5" />,
      price: 15,
      description: "Capture your adventure",
    },
    {
      id: "phoneMount",
      name: "Phone Mount",
      icon: <Sparkles className="w-5 h-5" />,
      price: 3,
      description: "Secure phone holder",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pickupDate || !returnDate) {
      toast.error("Please select pickup and return dates");
      return;
    }

    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);

    if (picked >= returned) {
      toast.error("Return date must be after pickup date");
      return;
    }

    if (picked < new Date().setHours(0, 0, 0, 0)) {
      toast.error("Pickup date cannot be in the past");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/bookings/motorcycle/create", {
        motor: id,
        pickupDate,
        returnDate,
        pickupLocation,
        rentalDays,
        selectedFeatures,
        totalPrice: calculateTotalPrice(),
      });

      if (data.success) {
        toast.success("🏍️ Motorcycle booked successfully!");
        setPickupDate("");
        setReturnDate("");
        setRentalDays(1);
        setSelectedFeatures([]);
        setPickupLocation("main-office");
        navigate("/bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Booking failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    if (!motor) return 0;
    const basePrice = motor.pricePerDay * rentalDays;
    const featuresPrice = selectedFeatures.reduce((total, featureId) => {
      const feature = features.find((f) => f.id === featureId);
      return total + (feature ? feature.price * rentalDays : 0);
    }, 0);
    return basePrice + featuresPrice;
  };

  const toggleFeature = (featureId) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const getCategoryLabel = (category) => {
    const labels = {
      scooter: "Scooter 🛵",
      underbone: "Underbone 🏍️",
      big_bike: "Big Bike 🔥",
      sportbike: "Sport Bike ⚡",
      cruiser: "Cruiser 🛣️",
      naked: "Naked Bike 💨",
      adventure: "Adventure 🗺️",
      electric: "Electric 🔋",
    };
    return labels[category] || category;
  };

  useEffect(() => {
    const foundMotor = motors.find((motor) => motor._id === id);
    if (foundMotor) {
      setMotor(foundMotor);
    }
  }, [motors, id]);

  if (!motor) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-red-50/20"
    >
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-gray-900 via-red-900 to-orange-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 opacity-10"></div>
        <div className="relative z-10 container mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 hover:gap-3 transition-all"
          >
            <Navigation className="w-5 h-5 rotate-180" />
            Back to All Motorcycles
          </button>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
                  <Bike className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium px-3 py-1 bg-white/10 rounded-full">
                  {getCategoryLabel(motor.category)}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {motor.brand} {motor.model}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span>4.9 • 86 Reviews</span>
                </div>
                <span className="text-white/60">•</span>
                <span className="text-green-400 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Available Now
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                {currency}
                {motor.pricePerDay}
                <span className="text-sm font-normal text-white/60">
                  {" "}
                  / day
                </span>
              </div>
              <p className="text-white/60">Helmet & basic insurance included</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Motorcycle Images & Details */}
          <div className="lg:col-span-2">
            {/* Single Main Image */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl mb-6"
            >
              <img
                src={motor.image}
                alt={`${motor.brand} ${motor.model}`}
                className="w-full h-[400px] object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80";
                }}
              />

              {/* Engine CC Overlay */}
              <div className="absolute top-4 left-4">
                <div className="px-4 py-2 bg-gradient-to-r from-red-500/90 to-orange-500/90 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Gauge className="w-4 h-4" />
                    <span>{motor.engine_cc}cc</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Motorcycle Specifications */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Technical Specs</h2>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Performance Rating: 4.8/5
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    icon: <Gauge className="w-5 h-5" />,
                    label: "Engine",
                    value: `${motor.engine_cc}cc`,
                    color: "text-red-600",
                  },
                  {
                    icon: <Fuel className="w-5 h-5" />,
                    label: "Fuel",
                    value: motor.fuel_type,
                    color: "text-blue-600",
                  },
                  {
                    icon: <Cog className="w-5 h-5" />,
                    label: "Transmission",
                    value: motor.transmission,
                    color: "text-purple-600",
                  },
                  {
                    icon: <Wind className="w-5 h-5" />,
                    label: "Type",
                    value: getCategoryLabel(motor.category),
                    color: "text-orange-600",
                  },
                  {
                    icon: <Zap className="w-5 h-5" />,
                    label: "Power",
                    value: "Smooth",
                    color: "text-yellow-600",
                  },
                  {
                    icon: <ThermometerSun className="w-5 h-5" />,
                    label: "Cooling",
                    value: "Liquid",
                    color: "text-cyan-600",
                  },
                  {
                    icon: <Sparkles className="w-5 h-5" />,
                    label: "Condition",
                    value: "Excellent",
                    color: "text-green-600",
                  },
                  {
                    icon: <Calendar className="w-5 h-5" />,
                    label: "Year",
                    value: motor.year,
                    color: "text-indigo-600",
                  },
                ].map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex flex-col items-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all group"
                  >
                    <div
                      className={`${spec.color} mb-2 group-hover:scale-110 transition-transform`}
                    >
                      {spec.icon}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {spec.label}
                    </div>
                    <div className="font-bold text-gray-800 mt-1">
                      {spec.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">About This Motorcycle</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {motor.description ||
                  `Experience the thrill of riding the ${motor.brand} ${motor.model} through the beautiful landscapes of Negros Island. This ${motor.year} model with its powerful ${motor.engine_cc}cc engine and ${motor.transmission} transmission is perfect for exploring everything from Bacolod's city streets to Dumaguete's coastal roads.`}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Perfect For Negros
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Mountain roads to Mambukal</li>
                    <li>• Coastal highways along Dumaguete</li>
                    <li>• City commuting in Bacolod</li>
                    <li>• Tourist spot exploration</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600" />
                    Safety Features
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• ABS Braking System</li>
                    <li>• LED Lighting Package</li>
                    <li>• Emergency Kit Included</li>
                    <li>• 24/7 Support Available</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Map Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Pickup Locations</h2>
                  <p className="text-gray-600">
                    Select your preferred pickup point in Negros
                  </p>
                </div>
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                >
                  <MapPin className="w-5 h-5" />
                  {showMap ? "Hide Map" : "Show Map"}
                </button>
              </div>

              {showMap && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-6"
                >
                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg relative border border-gray-200">
                    {/* Map Image */}
                    <img
                      src={fallbackMapImages[pickupLocation]}
                      alt="Pickup Location"
                      className="w-full h-full object-cover"
                    />

                    {/* Map Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                          <div className="text-white">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                                <Bike className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold">
                                  {
                                    pickupLocations.find(
                                      (loc) => loc.id === pickupLocation
                                    )?.name
                                  }
                                </h3>
                                <p className="text-white/90">
                                  {
                                    pickupLocations.find(
                                      (loc) => loc.id === pickupLocation
                                    )?.address
                                  }
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-white/80">
                              {
                                pickupLocations.find(
                                  (loc) => loc.id === pickupLocation
                                )?.description
                              }
                            </p>
                          </div>

                          {/* Google Maps Link */}
                          <a
                            href={
                              pickupLocations.find(
                                (loc) => loc.id === pickupLocation
                              )?.googleMapsUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg font-medium"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Open in Maps</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Map Legend */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium">
                          Motorcycle Pickup
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Location Stats */}
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {[
                      {
                        label: "Quick Pickup",
                        value: "10 min",
                        color: "text-red-600",
                      },
                      {
                        label: "Free Parking",
                        value: "Secure",
                        color: "text-green-600",
                      },
                      {
                        label: "Gear Check",
                        value: "Included",
                        color: "text-blue-600",
                      },
                      {
                        label: "Open Hours",
                        value: "24/7",
                        color: "text-orange-600",
                      },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="text-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div className={`font-bold ${stat.color}`}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <div className="space-y-4">
                {pickupLocations.map((location) => (
                  <motion.button
                    key={location.id}
                    onClick={() => setPickupLocation(location.id)}
                    whileHover={{ x: 5 }}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      pickupLocation === location.id
                        ? "border-red-500 bg-gradient-to-r from-red-50 to-orange-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            pickupLocation === location.id
                              ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {location.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {location.address}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {location.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      {pickupLocation === location.id && (
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="space-y-8">
            {/* Booking Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-xl sticky top-6 border border-gray-100"
            >
              <div className="mb-6">
                <div className="text-3xl font-bold mb-2 text-gray-900">
                  {currency}
                  {motor.pricePerDay}
                  <span className="text-lg font-normal text-gray-500">
                    {" "}
                    / day
                  </span>
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  Basic insurance & helmet included
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Adventure Dates
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        required
                        min={new Date().toISOString().split("T")[0]}
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        Start Ride
                      </div>
                    </div>
                    <div>
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        required
                        min={
                          pickupDate || new Date().toISOString().split("T")[0]
                        }
                      />
                      <div className="text-xs text-gray-500 mt-1">End Ride</div>
                    </div>
                  </div>
                </div>

                {/* Days Counter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Adventure Duration
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 cursor-pointer hover:scale-105 transition-all"
                    >
                      −
                    </button>
                    <div className="flex-1 text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {rentalDays} day{rentalDays > 1 ? "s" : ""}
                      </div>
                      <div className="text-sm text-gray-500">
                        {currency}
                        {motor.pricePerDay * rentalDays} base
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setRentalDays(rentalDays + 1)}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 cursor-pointer hover:scale-105 transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Additional Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Adventure Gear & Extras
                  </label>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {features.map((feature) => (
                      <label
                        key={feature.id}
                        className={`flex items-start justify-between p-3 rounded-xl border-2 cursor-pointer transition-all group ${
                          selectedFeatures.includes(feature.id)
                            ? "border-red-500 bg-gradient-to-r from-red-50 to-orange-50"
                            : "border-gray-200 hover:border-red-300"
                        }`}
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={selectedFeatures.includes(feature.id)}
                            onChange={() => toggleFeature(feature.id)}
                            className="hidden"
                          />
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                              selectedFeatures.includes(feature.id)
                                ? "bg-gradient-to-r from-red-500 to-orange-500 border-transparent"
                                : "border-gray-300 group-hover:border-red-300"
                            }`}
                          >
                            {selectedFeatures.includes(feature.id) && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className="text-red-600">{feature.icon}</div>
                              <span className="font-medium text-gray-900">
                                {feature.name}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-red-600 flex-shrink-0">
                          +{currency}
                          {feature.price}/day
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gradient-to-r from-gray-50 to-red-50 rounded-xl p-4 border border-gray-200">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Base Price ({rentalDays} days)
                      </span>
                      <span className="font-medium">
                        {currency}
                        {motor.pricePerDay * rentalDays}
                      </span>
                    </div>
                    {selectedFeatures.map((featureId) => {
                      const feature = features.find((f) => f.id === featureId);
                      return feature ? (
                        <div
                          key={featureId}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-500">{feature.name}</span>
                          <span>
                            +{currency}
                            {feature.price * rentalDays}
                          </span>
                        </div>
                      ) : null;
                    })}
                    <hr className="my-3 border-gray-300" />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900">
                        Total Adventure Cost
                      </span>
                      <span className="text-red-600">
                        {currency}
                        {calculateTotalPrice()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 text-center pt-2">
                      No hidden fees • All taxes included
                    </div>
                  </div>
                </div>

                {/* Book Now Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Starting Your Adventure...</span>
                    </>
                  ) : (
                    <>
                      <Bike className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span>Start Your Adventure</span>
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500">
                  <Bell className="w-4 h-4 inline mr-1" />
                  Free cancellation • 24/7 support • Verified riders only
                </p>
              </form>
            </motion.div>

            {/* Features Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Included in Every Ride
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: <HardHat className="w-5 h-5" />,
                    text: "Premium Helmet (Basic)",
                    note: "DOT certified",
                  },
                  {
                    icon: <Shield className="w-5 h-5" />,
                    text: "Basic Insurance",
                    note: "Accident coverage",
                  },
                  {
                    icon: <Lock className="w-5 h-5" />,
                    text: "Security Lock",
                    note: "Disc lock included",
                  },
                  {
                    icon: <Key className="w-5 h-5" />,
                    text: "24/7 Roadside",
                    note: "Emergency assistance",
                  },
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    text: "Negros Routes Guide",
                    note: "Best riding spots",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="text-red-500 mt-0.5">{item.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {item.text}
                      </div>
                      <div className="text-sm text-gray-500">{item.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MotorDetails;
