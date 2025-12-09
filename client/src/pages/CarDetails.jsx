import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Car,
  MapPin,
  Users,
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
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("main-office");
  const [rentalDays, setRentalDays] = useState(1);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    cars,
    currency,
    axios,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    navigate,
  } = useAppContext();

  const pickupLocations = [
    {
      id: "main-office",
      name: "Main Office - Lacson Street",
      address: "Lacson Street, Bacolod City",
      lat: 10.6407,
      lng: 122.9687,
      features: ["24/7 Support", "Free Parking", "Car Wash Available"],
      googleMapsUrl: "https://www.google.com/maps?q=10.6407,122.9687",
      googleMapsStatic:
        "https://maps.googleapis.com/maps/api/staticmap?center=10.6407,122.9687&zoom=16&size=600x400&markers=color:blue%7Clabel:P%7C10.6407,122.9687&key=YOUR_API_KEY",
    },
    {
      id: "airport",
      name: "Bacolod-Silay Airport",
      address: "Bacolod-Silay Airport, Silay City",
      lat: 10.7667,
      lng: 122.9667,
      features: ["Airport Lounge", "Quick Check-in", "Shuttle Service"],
      googleMapsUrl: "https://www.google.com/maps?q=10.7667,122.9667",
      googleMapsStatic:
        "https://maps.googleapis.com/maps/api/staticmap?center=10.7667,122.9667&zoom=16&size=600x400&markers=color:blue%7Clabel:A%7C10.7667,122.9667&key=YOUR_API_KEY",
    },
    {
      id: "sm-bacolod",
      name: "SM City Bacolod",
      address: "SM City Bacolod, Bacolod City",
      lat: 10.645,
      lng: 122.95,
      features: ["Mall Access", "Parking Available", "Food Court Nearby"],
      googleMapsUrl: "https://www.google.com/maps?q=10.645,122.95",
      googleMapsStatic:
        "https://maps.googleapis.com/maps/api/staticmap?center=10.645,122.95&zoom=16&size=600x400&markers=color:blue%7Clabel:S%7C10.645,122.95&key=YOUR_API_KEY",
    },
  ];

  // Fallback images for Google Maps
  const fallbackMapImages = {
    "main-office":
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    airport:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    "sm-bacolod":
      "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&w=1200&q=80",
  };

  const features = [
    {
      id: "insurance",
      name: "Full Insurance",
      icon: <Shield className="w-5 h-5" />,
      price: 15,
    },
    {
      id: "gps",
      name: "GPS Navigation",
      icon: <Navigation className="w-5 h-5" />,
      price: 10,
    },
    {
      id: "wifi",
      name: "WiFi Hotspot",
      icon: <Wifi className="w-5 h-5" />,
      price: 8,
    },
    {
      id: "music",
      name: "Premium Audio",
      icon: <Music className="w-5 h-5" />,
      price: 5,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate dates
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
      const { data } = await axios.post("/api/bookings/create", {
        car: id,
        pickupDate,
        returnDate,
        pickupLocation,
        rentalDays,
        selectedFeatures,
        totalPrice: calculateTotalPrice(),
      });

      if (data.success) {
        toast.success(data.message);
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
    if (!car) return 0;
    const basePrice = car.pricePerDay * rentalDays;
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

  useEffect(() => {
    const foundCar = cars.find((car) => car._id === id);
    if (foundCar) {
      setCar(foundCar);
    }
  }, [cars, id]);

  if (!car) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-gray-900 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 opacity-10"></div>
        <div className="relative z-10 container mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6"
          >
            <Navigation className="w-5 h-5 rotate-180" />
            Back to All Cars
          </button>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {car.brand} {car.model}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span>4.8 • 124 Reviews</span>
                </div>
                <span className="text-white/60">•</span>
                <span className="text-green-400">Available Now</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {currency}
                {car.pricePerDay}
                <span className="text-sm font-normal text-white/60">
                  {" "}
                  / day
                </span>
              </div>
              <p className="text-white/60">Inclusive of insurance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Car Images & Details */}
          <div className="lg:col-span-2">
            {/* Single Main Image */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl mb-6"
            >
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-[400px] object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200";
                }}
              />
            </motion.div>

            {/* Car Specifications */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    icon: <Car className="w-6 h-6" />,
                    label: "Type",
                    value: car.category || "Sedan",
                  },
                  {
                    icon: <Fuel className="w-6 h-6" />,
                    label: "Fuel",
                    value: car.fuel_type || "Petrol",
                  },
                  {
                    icon: <Cog className="w-6 h-6" />,
                    label: "Transmission",
                    value: car.transmission || "Automatic",
                  },
                  {
                    icon: <Users className="w-6 h-6" />,
                    label: "Seats",
                    value: `${car.seating_capacity || 5} Persons`,
                  },
                  {
                    icon: <Calendar className="w-6 h-6" />,
                    label: "Year",
                    value: car.year || "2023",
                  },
                  {
                    icon: <Wind className="w-6 h-6" />,
                    label: "AC",
                    value: "Automatic",
                  },
                  {
                    icon: <Zap className="w-6 h-6" />,
                    label: "Power",
                    value: "180 HP",
                  },
                  {
                    icon: <Shield className="w-6 h-6" />,
                    label: "Safety",
                    value: "5-Star",
                  },
                ].map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-blue-600 mb-2">{spec.icon}</div>
                    <div className="text-sm text-gray-500">{spec.label}</div>
                    <div className="font-semibold">{spec.value}</div>
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
              <h2 className="text-2xl font-bold mb-4">About This Car</h2>
              <p className="text-gray-600 leading-relaxed">
                {car.description ||
                  `Experience the perfect blend of luxury and performance with the ${
                    car.brand
                  } ${car.model}. This meticulously maintained ${
                    car.year || "2023"
                  } model features ${car.seating_capacity || 5}-seat comfort, ${
                    car.fuel_type || "Petrol"
                  } efficiency, and ${
                    car.transmission || "Automatic"
                  } transmission for a smooth ride. Perfect for both city commuting and long road trips.`}
              </p>
            </motion.div>

            {/* Map Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Pickup Locations</h2>
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
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
                    {/* Google Map Image */}
                    <img
                      src={fallbackMapImages[pickupLocation]}
                      alt="Google Maps Location"
                      className="w-full h-full object-cover"
                    />

                    {/* Google Maps Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-start justify-between">
                          <div className="text-white">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <MapPin className="w-4 h-4 text-red-500" />
                              </div>
                              <h3 className="text-xl font-bold">
                                {
                                  pickupLocations.find(
                                    (loc) => loc.id === pickupLocation
                                  )?.name
                                }
                              </h3>
                            </div>
                            <p className="text-white/90">
                              {
                                pickupLocations.find(
                                  (loc) => loc.id === pickupLocation
                                )?.address
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
                            className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="font-medium">
                              Open in Google Maps
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Map Controls Simulated */}
                    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2">
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded">
                          +
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded">
                          −
                        </button>
                      </div>
                    </div>

                    {/* Map Legend */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">
                          Your Pickup Point
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Location Details */}
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-blue-600 font-bold">2 min</div>
                      <div className="text-xs text-gray-600">From Highway</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-green-600 font-bold">Free</div>
                      <div className="text-xs text-gray-600">Parking</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-orange-600 font-bold">24/7</div>
                      <div className="text-xs text-gray-600">Access</div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="space-y-4">
                {pickupLocations.map((location) => (
                  <motion.button
                    key={location.id}
                    onClick={() => setPickupLocation(location.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      pickupLocation === location.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <h3 className="font-semibold">{location.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {location.address}
                        </p>
                        <div className="flex flex-wrap gap-2">
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
                      {pickupLocation === location.id && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
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
              className="bg-white rounded-2xl p-6 shadow-xl sticky top-6"
            >
              <div className="mb-6">
                <div className="text-3xl font-bold mb-2">
                  {currency}
                  {car.pricePerDay}
                  <span className="text-lg font-normal text-gray-500">
                    {" "}
                    / day
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  All taxes and fees included
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Rental Period
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        min={new Date().toISOString().split("T")[0]}
                      />
                      <div className="text-xs text-gray-500 mt-1">Pickup</div>
                    </div>
                    <div>
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        min={
                          pickupDate || new Date().toISOString().split("T")[0]
                        }
                      />
                      <div className="text-xs text-gray-500 mt-1">Return</div>
                    </div>
                  </div>
                </div>

                {/* Days Counter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Number of Days
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                    >
                      −
                    </button>
                    <div className="flex-1 text-center">
                      <div className="text-2xl font-bold">
                        {rentalDays} days
                      </div>
                      <div className="text-sm text-gray-500">
                        {currency}
                        {car.pricePerDay * rentalDays} total
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setRentalDays(rentalDays + 1)}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Additional Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Additional Features
                  </label>
                  <div className="space-y-3">
                    {features.map((feature) => (
                      <label
                        key={feature.id}
                        className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedFeatures.includes(feature.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedFeatures.includes(feature.id)}
                            onChange={() => toggleFeature(feature.id)}
                            className="hidden"
                          />
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center ${
                              selectedFeatures.includes(feature.id)
                                ? "bg-blue-500 border-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedFeatures.includes(feature.id) && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-blue-600">{feature.icon}</div>
                            <span>{feature.name}</span>
                          </div>
                        </div>
                        <span className="font-medium">
                          +{currency}
                          {feature.price}/5km
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Base Price ({rentalDays} days)
                      </span>
                      <span>
                        {currency}
                        {car.pricePerDay * rentalDays}
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
                    <hr className="my-2" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-blue-600">
                        {currency}
                        {calculateTotalPrice()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Book Now Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Book Now</span>
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500">
                  <Bell className="w-4 h-4 inline mr-1" />
                  Free cancellation up to 24 hours before pickup
                </p>
              </form>
            </motion.div>

            {/* Features Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">Included in Rental</h3>
              <div className="space-y-3">
                {[
                  {
                    icon: <Shield className="w-5 h-5" />,
                    text: "Comprehensive Insurance",
                  },
                  {
                    icon: <Navigation className="w-5 h-5" />,
                    text: "Basic GPS",
                  },
                  {
                    icon: <Car className="w-5 h-5" />,
                    text: "24/7 Roadside Assistance",
                  },
                  {
                    icon: <Users className="w-5 h-5" />,
                    text: "Free Additional Driver",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-green-500">{item.icon}</div>
                    <span className="text-gray-700">{item.text}</span>
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

export default CarDetails;
