import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Bike,
  DollarSign,
  Filter,
  Search,
  TrendingUp,
  Phone,
  Mail,
  Settings,
  Fuel,
  Users,
  X,
  MapPin,
  FileText,
  Gauge,
  Wind,
  Shield,
  Zap,
  Navigation,
  Route,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import LoadingScreen from "../../components/LoadingScreen";

const ManageBookings = () => {
  const { axios, currency, isOwner } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);

  const statusOptions = [
    { value: "all", label: "All Bookings", color: "gray" },
    { value: "pending", label: "Pending", color: "yellow" },
    { value: "confirmed", label: "Confirmed", color: "blue" },
    { value: "completed", label: "Completed", color: "green" },
    { value: "cancelled", label: "Cancelled", color: "red" },
  ];

  const fetchOwnerBookings = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/motor/bookings/owner`);
      if (data.success) {
        setBookings(data.bookings);
        setFilteredBookings(data.bookings);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    setUpdating(true);
    try {
      const { data } = await axios.post(`/api/motor/bookings/change-status`, {
        bookingId,
        status,
      });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerBookings();
        if (selectedBooking && selectedBooking._id === bookingId) {
          setSelectedBooking({ ...selectedBooking, status });
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update booking status"
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleQuickView = (booking) => {
    setSelectedBooking(booking);
    setShowQuickView(true);
  };

  const closeQuickView = () => {
    setShowQuickView(false);
    setTimeout(() => {
      setSelectedBooking(null);
    }, 300);
  };

  // Filter bookings
  useEffect(() => {
    let filtered = bookings;

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (booking) =>
          booking.motor?.brand?.toLowerCase().includes(term) ||
          booking.motor?.model?.toLowerCase().includes(term) ||
          booking.user?.name?.toLowerCase().includes(term) ||
          booking.status?.toLowerCase().includes(term) ||
          booking.pickupLocation?.toLowerCase().includes(term) ||
          booking.dropOffLocation?.toLowerCase().includes(term)
      );
    }

    setFilteredBookings(filtered);
  }, [bookings, statusFilter, searchTerm]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Calculate price per KM
  const calculatePricePerKm = (booking) => {
    if (booking.totalKm && booking.totalPrice) {
      return Math.round((booking.totalPrice / booking.totalKm) * 100) / 100;
    }
    return 65; // Default P65 per 5km
  };

  // Format location (shorten if too long)
  const formatLocation = (location, maxLength = 25) => {
    if (!location) return "Not specified";
    if (location.length <= maxLength) return location;
    return `${location.substring(0, maxLength)}...`;
  };

  useEffect(() => {
    if (isOwner) {
      fetchOwnerBookings();
    }
  }, [isOwner]);

  if (loading) return <LoadingScreen />;

  // Calculate stats
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    totalKm: bookings.reduce((sum, booking) => sum + (booking.totalKm || 0), 0),
    revenue: bookings
      .filter((b) => b.status === "completed" || b.status === "confirmed")
      .reduce((sum, booking) => sum + (booking.totalPrice || 0), 0),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6 relative"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Ride Bookings
            </h1>
            <p className="text-gray-600 mt-2">
              Track all ride bookings, manage customer trips, and monitor ride
              statuses.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchOwnerBookings}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Route className="w-4 h-4" />
              Refresh Rides
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Total Rides
              </h3>
              <p className="text-3xl font-bold mt-2">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Route className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Active</h3>
              <p className="text-3xl font-bold mt-2">{stats.confirmed}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Total Distance
              </h3>
              <p className="text-3xl font-bold mt-2">
                {stats.totalKm.toLocaleString()} km
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <Navigation className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
              <p className="text-3xl font-bold mt-2">
                {currency}
                {stats.revenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-xl">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by motorcycle, customer, pickup/drop-off location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Table with Scrollbar */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="max-h-[500px] overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ride Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Locations
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price & Distance
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((booking, index) => {
                  const pricePerKm = calculatePricePerKm(booking);

                  return (
                    <motion.tr
                      key={booking._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              booking.motor?.image || "/placeholder-motor.jpg"
                            }
                            alt={`${booking.motor?.brand} ${booking.motor?.model}`}
                            className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                            onError={(e) => {
                              e.target.src = "/placeholder-motor.jpg";
                            }}
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {booking.motor?.brand} {booking.motor?.model}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              <div className="flex items-center gap-2">
                                <Bike className="w-3 h-3" />
                                {booking.motor?.category || "Motorcycle"}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Gauge className="w-3 h-3" />
                                {booking.motor?.engine_cc}cc
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="w-4 h-4 text-green-500" />
                              <span className="font-medium text-gray-900">
                                Pickup
                              </span>
                            </div>
                            <div className="pl-6 text-sm text-gray-700">
                              {formatLocation(booking.pickupLocation)}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="w-4 h-4 text-red-500" />
                              <span className="font-medium text-gray-900">
                                Drop-off
                              </span>
                            </div>
                            <div className="pl-6 text-sm text-gray-700">
                              {formatLocation(booking.dropOffLocation)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {booking.user?.name || "Customer"}
                              </div>
                              <div className="text-sm text-gray-500">
                                {booking.user?.email || "No email"}
                              </div>
                            </div>
                          </div>
                          {booking.user?.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-3 h-3" />
                              {booking.user.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="font-bold text-gray-900 text-lg">
                            {currency}
                            {booking.totalPrice?.toLocaleString() || "0"}
                          </div>
                          <div className="text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Navigation className="w-3 h-3" />
                              {booking.totalKm || 0} km
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <DollarSign className="w-3 h-3" />P{pricePerKm}/km
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {getStatusIcon(booking.status)}
                          <span className="capitalize">{booking.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          {booking.status === "pending" ||
                          booking.status === "confirmed" ? (
                            <select
                              onChange={(e) =>
                                changeBookingStatus(booking._id, e.target.value)
                              }
                              value={booking.status}
                              disabled={updating}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50"
                            >
                              <option value="pending">Pending</option>
                              <option value="cancelled">Cancel</option>
                              <option value="confirmed">Confirm</option>
                              <option value="completed">Complete</option>
                            </select>
                          ) : (
                            <span
                              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(
                                booking.status
                              )}`}
                            >
                              {booking.status}
                            </span>
                          )}

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleQuickView(booking)}
                              className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => {
                                if (booking.user?.email) {
                                  window.location.href = `mailto:${booking.user.email}`;
                                } else {
                                  toast.error(
                                    "No email available for this customer"
                                  );
                                }
                              }}
                              className="text-xs text-gray-500 hover:text-gray-700 font-medium"
                            >
                              Contact
                            </button>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>

            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-5xl mb-4">🚗</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No ride bookings found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {searchTerm || statusFilter !== "all"
                    ? "No bookings match your current filters. Try adjusting your search criteria."
                    : "You don't have any ride bookings yet. When customers book rides, they'll appear here."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>
          Showing {filteredBookings.length} of {bookings.length} rides • Last
          updated:{" "}
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* Quick View Side Panel */}
      <AnimatePresence>
        {showQuickView && selectedBooking && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeQuickView}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Side Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Ride Details
                  </h2>
                  <button
                    onClick={closeQuickView}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                    selectedBooking.status
                  )}`}
                >
                  {getStatusIcon(selectedBooking.status)}
                  <span className="capitalize">{selectedBooking.status}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Motorcycle Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Motorcycle Information
                  </h3>
                  <img
                    src={
                      selectedBooking.motor?.image || "/placeholder-motor.jpg"
                    }
                    alt={`${selectedBooking.motor?.brand} ${selectedBooking.motor?.model}`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      e.target.src = "/placeholder-motor.jpg";
                    }}
                  />
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-gray-900">
                      {selectedBooking.motor?.brand}{" "}
                      {selectedBooking.motor?.model}
                    </h4>
                    <p className="text-gray-600">
                      {selectedBooking.motor?.year}
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Bike className="w-4 h-4 text-gray-400" />
                        <span>{selectedBooking.motor?.category}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Settings className="w-4 h-4 text-gray-400" />
                        <span>{selectedBooking.motor?.transmission}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Fuel className="w-4 h-4 text-gray-400" />
                        <span>{selectedBooking.motor?.fuel_type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Zap className="w-4 h-4 text-gray-400" />
                        <span>{selectedBooking.motor?.engine_cc}cc</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm mt-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{selectedBooking.motor?.location}</span>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Customer Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {selectedBooking.user?.name || "Customer"}
                        </h4>
                        <p className="text-sm text-gray-600">Rider</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>
                          {selectedBooking.user?.email || "Not available"}
                        </span>
                      </div>
                      {selectedBooking.user?.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{selectedBooking.user.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ride Route Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Ride Route
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">
                            Pickup Location
                          </div>
                          <div className="font-medium text-gray-900">
                            {selectedBooking.pickupLocation}
                          </div>
                        </div>
                      </div>
                      <div className="pl-11 relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                        <div className="text-gray-400 py-2 flex items-center">
                          <Navigation className="w-4 h-4 mr-2" />
                          <span className="text-xs">
                            {selectedBooking.totalKm || 0} km ride
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-red-600" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">
                              Drop-off Location
                            </div>
                            <div className="font-medium text-gray-900">
                              {selectedBooking.dropOffLocation}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          Ride Summary
                        </span>
                        <Route className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm text-gray-500">
                              Total Distance
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              {selectedBooking.totalKm || 0} km
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">
                              Price per km
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              P{calculatePricePerKm(selectedBooking)}/km
                            </div>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">
                              Total Amount
                            </span>
                            <span className="text-2xl font-bold text-gray-900">
                              {currency}
                              {selectedBooking.totalPrice?.toLocaleString() ||
                                "0"}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Booking ID</span>
                          <span className="font-mono">
                            {selectedBooking._id?.slice(-8)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    {selectedBooking.status === "pending" ||
                    selectedBooking.status === "confirmed" ? (
                      <select
                        onChange={(e) =>
                          changeBookingStatus(
                            selectedBooking._id,
                            e.target.value
                          )
                        }
                        value={selectedBooking.status}
                        disabled={updating}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                      >
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancel Ride</option>
                        <option value="confirmed">Confirm Ride</option>
                        <option value="completed">Mark as Completed</option>
                      </select>
                    ) : null}

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          if (selectedBooking.user?.email) {
                            window.location.href = `mailto:${selectedBooking.user.email}`;
                          } else {
                            toast.error("No email available for this customer");
                          }
                        }}
                        className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Email Rider
                      </button>
                      <button
                        onClick={() => {
                          // Generate ride receipt functionality
                          toast.success("Ride receipt generated successfully!");
                        }}
                        className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Receipt
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageBookings;
