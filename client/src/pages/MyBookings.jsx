import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  Download,
  MessageCircle,
  Shield,
  Fuel,
  Cpu,
  Bike,
  Wrench,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import Loader from "../components/Loader";

const MyBookings = () => {
  const { currency, allBookings, fetchAllBookings, user, axios } =
    useAppContext();
  const [loading, setLoading] = useState(false);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchAllBookings().finally(() => setLoading(false));
    }
  }, [user]);

  const filterOptions = [
    { value: "all", label: "All Bookings", count: allBookings?.length || 0 },
    {
      value: "confirmed",
      label: "Confirmed",
      count: allBookings?.filter((b) => b.status === "confirmed").length || 0,
    },
    {
      value: "pending",
      label: "Pending",
      count: allBookings?.filter((b) => b.status === "pending").length || 0,
    },
    {
      value: "completed",
      label: "Completed",
      count: allBookings?.filter((b) => b.status === "completed").length || 0,
    },
    {
      value: "cancelled",
      label: "Cancelled",
      count: allBookings?.filter((b) => b.status === "cancelled").length || 0,
    },
  ];

  const filteredBookings = allBookings
    ? activeFilter === "all"
      ? allBookings
      : allBookings.filter((booking) => booking.status === activeFilter)
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

  const getPaymentStatusConfig = (status) => {
    switch (status) {
      case "paid":
        return "text-green-600 bg-green-50 border-green-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "failed":
        return "text-red-600 bg-red-50 border-red-200";
      case "refunded":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "scooter":
        return "🛵";
      case "underbone":
        return "🏍️";
      case "big bike":
        return "🏍️";
      default:
        return "🛵";
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/motor/bookings/change-status`, {
        bookingId,
        status: "cancelled",
      });
      if (data.success) {
        await fetchAllBookings();
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
          <h1 className="text-3xl font-bold text-gray-900">
            My Motorcycle Bookings
          </h1>
          <p className="text-gray-600 mt-2">
            View and manage all your motorcycle rental bookings in one place
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
                  {allBookings?.length || 0}
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
                  {allBookings?.filter((b) => b.status === "confirmed")
                    .length || 0}
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
                  {allBookings?.filter((b) => b.status === "pending").length ||
                    0}
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
                  {allBookings
                    ?.filter((b) => b.status !== "cancelled")
                    .reduce((sum, booking) => sum + booking.totalPrice, 0)
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
            <div className="text-6xl mb-4">🏍️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {activeFilter !== "all"
                ? `You don't have any ${activeFilter} bookings.`
                : "You haven't made any bookings yet. Start by browsing available motorcycles!"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking, index) => {
              const statusConfig = getStatusConfig(booking.status);
              const isExpanded = expandedBooking === booking._id;
              const categoryIcon = getCategoryIcon(booking.motor?.category);

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
                        <div className="relative">
                          <img
                            src={booking.motor?.image}
                            alt={`${booking.motor?.brand} ${booking.motor?.model}`}
                            className="w-24 h-24 rounded-xl object-cover border border-gray-200"
                          />
                          <div className="absolute -top-2 -right-2 text-2xl">
                            {categoryIcon}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">
                              {booking.motor?.brand} {booking.motor?.model}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.color}`}
                            >
                              {statusConfig.icon}
                              {statusConfig.label}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-1">
                            {booking.motor?.year} • {booking.motor?.category} •{" "}
                            {booking.motor?.transmission}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Cpu className="w-4 h-4" />
                              <span>{booking.motor?.engine_cc}cc</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Fuel className="w-4 h-4" />
                              <span>{booking.motor?.fuel_type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Bike className="w-4 h-4" />
                              <span>{booking.rentalDays} days</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {currency}
                          {booking.totalPrice?.toLocaleString()}
                        </div>
                        <p className="text-sm text-gray-500">
                          {currency}
                          {booking.motor?.pricePerDay} × {booking.rentalDays}{" "}
                          days
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
                          <p className="text-sm text-gray-500">
                            Pick-up Location
                          </p>
                          <p className="font-medium">
                            {booking.pickupLocation}
                          </p>
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
                          {/* Motor Details */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                              Motorcycle Details
                            </h4>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="text-sm text-gray-500">
                                    Category
                                  </p>
                                  <p className="font-medium flex items-center gap-2">
                                    <span className="text-lg">
                                      {categoryIcon}
                                    </span>
                                    {booking.motor?.category}
                                  </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="text-sm text-gray-500">
                                    Engine Capacity
                                  </p>
                                  <p className="font-medium">
                                    {booking.motor?.engine_cc}cc
                                  </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="text-sm text-gray-500">
                                    Transmission
                                  </p>
                                  <p className="font-medium">
                                    {booking.motor?.transmission}
                                  </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="text-sm text-gray-500">
                                    Fuel Type
                                  </p>
                                  <p className="font-medium">
                                    {booking.motor?.fuel_type}
                                  </p>
                                </div>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">
                                  Description
                                </p>
                                <p className="font-medium mt-1">
                                  {booking.motor?.description ||
                                    "Premium rental motorcycle with all safety features included."}
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

                              {/* Selected Features */}
                              {booking.selectedFeatures?.length > 0 && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="text-sm text-gray-500 mb-2">
                                    Additional Features
                                  </p>
                                  <div className="space-y-2">
                                    {booking.selectedFeatures.map(
                                      (feature, idx) => (
                                        <div
                                          key={idx}
                                          className="flex justify-between items-center"
                                        >
                                          <span className="font-medium">
                                            {feature.name} × {feature.quantity}
                                          </span>
                                          <span className="text-blue-600">
                                            {currency}
                                            {feature.price * feature.quantity}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Price Breakdown */}
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500 mb-2">
                                  Price Breakdown
                                </p>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span>
                                      Base Rental ({booking.rentalDays} days)
                                    </span>
                                    <span>
                                      {currency}
                                      {booking.motor?.pricePerDay *
                                        booking.rentalDays}
                                    </span>
                                  </div>
                                  {booking.selectedFeatures?.map(
                                    (feature, idx) => (
                                      <div
                                        key={idx}
                                        className="flex justify-between text-sm"
                                      >
                                        <span>
                                          {feature.name} × {feature.quantity}
                                        </span>
                                        <span>
                                          {currency}
                                          {feature.price * feature.quantity}
                                        </span>
                                      </div>
                                    )
                                  )}
                                  <div className="border-t pt-2 flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>
                                      {currency}
                                      {booking.totalPrice}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Notes */}
                              {booking.notes && (
                                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                  <p className="text-sm text-gray-500 mb-1">
                                    Special Notes
                                  </p>
                                  <p className="font-medium">{booking.notes}</p>
                                </div>
                              )}

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
        {allBookings && allBookings.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Need help with your booking?
                </h3>
                <p className="text-gray-600">
                  Our support team is available 24/7 to assist you with any
                  questions or changes to your motorcycle rentals.
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
