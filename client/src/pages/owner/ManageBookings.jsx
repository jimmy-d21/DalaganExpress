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
          booking.status?.toLowerCase().includes(term)
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

  // Calculate days from booking dates
  const calculateDays = (pickupDate, returnDate) => {
    if (!pickupDate || !returnDate) return 1;
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    const diffTime = Math.abs(returnD - pickup);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Calculate total price
  const calculateTotalPrice = (booking) => {
    if (booking.totalPrice) return booking.totalPrice;
    if (booking.price) return booking.price;
    if (booking.motor?.pricePerDay) {
      const days = calculateDays(booking.pickupDate, booking.returnDate);
      return booking.motor.pricePerDay * days;
    }
    return 0;
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
    revenue: bookings
      .filter((b) => b.status === "completed" || b.status === "confirmed")
      .reduce((sum, booking) => sum + calculateTotalPrice(booking), 0),
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
              Manage Motorcycle Bookings
            </h1>
            <p className="text-gray-600 mt-2">
              Track all customer bookings, approve or cancel requests, and
              manage booking statuses for your motorcycles.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchOwnerBookings}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Refresh Bookings
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
                Total Bookings
              </h3>
              <p className="text-3xl font-bold mt-2">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
              <p className="text-3xl font-bold mt-2">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-600" />
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
              <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
              <p className="text-3xl font-bold mt-2">
                {currency}
                {stats.revenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-purple-600" />
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
                placeholder="Search bookings by motorcycle, customer, or status..."
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
                    Customer & Motorcycle
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
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
                  const totalPrice = calculateTotalPrice(booking);
                  const days = calculateDays(
                    booking.pickupDate,
                    booking.returnDate
                  );

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
                                <User className="w-3 h-3" />
                                {booking.user?.name || "Customer"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">
                              {booking.pickupDate
                                ? new Date(
                                    booking.pickupDate
                                  ).toLocaleDateString()
                                : "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>
                              to{" "}
                              {booking.returnDate
                                ? new Date(
                                    booking.returnDate
                                  ).toLocaleDateString()
                                : "N/A"}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400">
                            {days} day{days !== 1 ? "s" : ""}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900 text-lg">
                          {currency}
                          {totalPrice.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {currency}
                          {booking.motor?.pricePerDay || 0}/day
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
                              Quick View
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
                <div className="text-gray-400 text-5xl mb-4">📅</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No bookings found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {searchTerm || statusFilter !== "all"
                    ? "No bookings match your current filters. Try adjusting your search criteria."
                    : "You don't have any bookings yet. When customers book your motorcycles, they'll appear here."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>
          Showing {filteredBookings.length} of {bookings.length} bookings • Last
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
                    Booking Details
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
                        <p className="text-sm text-gray-600">Customer</p>
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

                {/* Booking Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Booking Details
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          Rental Period
                        </span>
                        <Calendar className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm text-gray-500">Pickup</div>
                            <div className="font-medium">
                              {selectedBooking.pickupDate
                                ? new Date(
                                    selectedBooking.pickupDate
                                  ).toLocaleDateString()
                                : "N/A"}
                            </div>
                          </div>
                          <div className="text-gray-400">→</div>
                          <div>
                            <div className="text-sm text-gray-500">Return</div>
                            <div className="font-medium">
                              {selectedBooking.returnDate
                                ? new Date(
                                    selectedBooking.returnDate
                                  ).toLocaleDateString()
                                : "N/A"}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 text-center">
                          {calculateDays(
                            selectedBooking.pickupDate,
                            selectedBooking.returnDate
                          )}{" "}
                          days total
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          Payment Details
                        </span>
                        <DollarSign className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Total Amount</span>
                          <span className="text-2xl font-bold text-gray-900">
                            {currency}
                            {calculateTotalPrice(
                              selectedBooking
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>
                            {currency}
                            {selectedBooking.motor?.pricePerDay || 0} ×{" "}
                            {selectedBooking.rentalDays ||
                              calculateDays(
                                selectedBooking.pickupDate,
                                selectedBooking.returnDate
                              )}{" "}
                            days
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Booking ID</span>
                          <span className="font-mono">
                            {selectedBooking._id?.slice(-8)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          Booking Timeline
                        </span>
                        <Clock className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Created</span>
                          <span>
                            {selectedBooking.createdAt
                              ? new Date(
                                  selectedBooking.createdAt
                                ).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                        {selectedBooking.updatedAt && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Updated</span>
                            <span>
                              {new Date(
                                selectedBooking.updatedAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        )}
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
                        <option value="cancelled">Cancel Booking</option>
                        <option value="confirmed">Confirm Booking</option>
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
                        Email
                      </button>
                      <button
                        onClick={() => {
                          // Generate invoice functionality
                          toast.success("Invoice generated successfully!");
                        }}
                        className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Invoice
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
