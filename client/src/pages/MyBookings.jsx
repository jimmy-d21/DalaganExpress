import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Phone,
  Mail,
  ChevronRight,
  Download,
  MessageCircle,
  Shield,
  Star,
  Users,
  Fuel,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import Loader from "../components/Loader";
import Title from "../components/Title";

const MyBookings = () => {
  const { currency, bookings, fetchMyBookings, user, axios } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchMyBookings().finally(() => setLoading(false));
    }
  }, [user]);

  const filterOptions = [
    { value: "all", label: "All Bookings", count: bookings?.length || 0 },
    {
      value: "confirmed",
      label: "Confirmed",
      count: bookings?.filter((b) => b.status === "confirmed").length || 0,
    },
    {
      value: "pending",
      label: "Pending",
      count: bookings?.filter((b) => b.status === "pending").length || 0,
    },
    {
      value: "completed",
      label: "Completed",
      count: bookings?.filter((b) => b.status === "completed").length || 0,
    },
    {
      value: "cancelled",
      label: "Cancelled",
      count: bookings?.filter((b) => b.status === "cancelled").length || 0,
    },
  ];

  const filteredBookings = bookings
    ? activeFilter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === activeFilter)
    : [];

  const getStatusConfig = (status) => {
    switch (status) {
      case "confirmed":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <CheckCircle className="w-4 h-4" />,
          label: "Confirmed",
        };
      case "pending":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: <Clock className="w-4 h-4" />,
          label: "Pending",
        };
      case "completed":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <CheckCircle className="w-4 h-4" />,
          label: "Completed",
        };
      case "cancelled":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: <XCircle className="w-4 h-4" />,
          label: "Cancelled",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <AlertCircle className="w-4 h-4" />,
          label: "Unknown",
        };
    }
  };

  const calculateDays = (pickupDate, returnDate) => {
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    const diffTime = Math.abs(returnD - pickup);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      setLoading(true);
      const response = await axios.post(`/api/bookings/cancel/${bookingId}`);
      if (response.data.success) {
        await fetchMyBookings();
      }
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = (booking) => {
    // Implement invoice download logic
    console.log("Download invoice for:", booking._id);
  };

  const handleContactOwner = (booking) => {
    // Implement contact owner logic
    console.log("Contact owner for:", booking._id);
  };

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">
            View and manage all your car rental bookings in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Total Bookings
                </h3>
                <p className="text-3xl font-bold mt-2">
                  {bookings?.length || 0}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Active</h3>
                <p className="text-3xl font-bold mt-2">
                  {bookings?.filter((b) => b.status === "confirmed").length ||
                    0}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Upcoming
                </h3>
                <p className="text-3xl font-bold mt-2">
                  {bookings?.filter((b) => b.status === "pending").length || 0}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Total Spent
                </h3>
                <p className="text-3xl font-bold mt-2">
                  {currency}
                  {bookings
                    ?.filter((b) => b.status !== "cancelled")
                    .reduce((sum, booking) => sum + booking.price, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  activeFilter === filter.value
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span>{filter.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    activeFilter === filter.value
                      ? "bg-white/20"
                      : "bg-gray-100"
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-gray-400 text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {activeFilter !== "all"
                ? `You don't have any ${activeFilter} bookings.`
                : "You haven't made any bookings yet. Start by browsing available cars!"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking, index) => {
              const statusConfig = getStatusConfig(booking.status);
              const days = calculateDays(
                booking.pickupDate,
                booking.returnDate
              );
              const isExpanded = expandedBooking === booking._id;

              return (
                <motion.div
                  key={booking._id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Booking Header */}
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={booking.car.image}
                          alt={`${booking.car.brand} ${booking.car.model}`}
                          className="w-24 h-24 rounded-xl object-cover border border-gray-200"
                        />
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">
                              {booking.car.brand} {booking.car.model}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.color}`}
                            >
                              {statusConfig.icon}
                              {statusConfig.label}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-1">
                            {booking.car.year} • {booking.car.category} •{" "}
                            {booking.car.transmission}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{booking.car.seating_capacity} seats</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Fuel className="w-4 h-4" />
                              <span>{booking.car.fuel_type}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {currency}
                          {booking.price.toLocaleString()}
                        </div>
                        <p className="text-sm text-gray-500">
                          {currency}
                          {booking.car.pricePerDay} × {days} days
                        </p>
                      </div>
                    </div>

                    {/* Quick Info Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Pick-up Date</p>
                          <p className="font-medium">
                            {new Date(booking.pickupDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Return Date</p>
                          <p className="font-medium">
                            {new Date(booking.returnDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">{booking.car.location}</p>
                        </div>
                      </div>
                    </div>

                    {/* Expand/Collapse Button */}
                    <button
                      onClick={() =>
                        setExpandedBooking(isExpanded ? null : booking._id)
                      }
                      className="mt-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {isExpanded ? "Show Less" : "View Details"}
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-100"
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Car Details */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                              Car Details
                            </h4>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="text-sm text-gray-500">
                                    Category
                                  </p>
                                  <p className="font-medium">
                                    {booking.car.category}
                                  </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="text-sm text-gray-500">
                                    Transmission
                                  </p>
                                  <p className="font-medium">
                                    {booking.car.transmission}
                                  </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="text-sm text-gray-500">
                                    Fuel Type
                                  </p>
                                  <p className="font-medium">
                                    {booking.car.fuel_type}
                                  </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="text-sm text-gray-500">
                                    Seating
                                  </p>
                                  <p className="font-medium">
                                    {booking.car.seating_capacity} seats
                                  </p>
                                </div>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">
                                  Description
                                </p>
                                <p className="font-medium mt-1">
                                  {booking.car.description ||
                                    "Premium rental car with all amenities included."}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Booking Info */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                              Booking Information
                            </h4>
                            <div className="space-y-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <p className="font-medium text-gray-900">
                                    Booking ID
                                  </p>
                                  <span className="text-sm text-gray-500">
                                    #{booking._id.slice(-8)}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-500">
                                  Created on{" "}
                                  {new Date(
                                    booking.createdAt
                                  ).toLocaleDateString()}
                                </div>
                              </div>

                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500 mb-2">
                                  Rental Duration
                                </p>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-medium">
                                      {days} {days === 1 ? "Day" : "Days"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Total rental period
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">
                                      {currency}
                                      {booking.car.pricePerDay}/day
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Daily rate
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex flex-wrap gap-3 pt-4">
                                {booking.status === "pending" && (
                                  <button
                                    onClick={() =>
                                      handleCancelBooking(booking._id)
                                    }
                                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                  >
                                    Cancel Booking
                                  </button>
                                )}

                                <button
                                  onClick={() => handleDownloadInvoice(booking)}
                                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                  <Download className="w-4 h-4" />
                                  Download Invoice
                                </button>

                                <button
                                  onClick={() => handleContactOwner(booking)}
                                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                  <MessageCircle className="w-4 h-4" />
                                  Contact Owner
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Help Section */}
        {bookings && bookings.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Need help with your booking?
                </h3>
                <p className="text-gray-600">
                  Our support team is available 24/7 to assist you with any
                  questions or changes to your bookings.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                  Contact Support
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  View FAQ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyBookings;
