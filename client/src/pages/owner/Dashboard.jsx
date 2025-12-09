import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  CheckCircle,
  TrendingUp,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Shield,
  MapPin,
  Filter,
  Activity,
  Award,
  Target,
  BarChart3,
  Download,
  RefreshCw,
  ChevronRight,
  Eye,
  Plus,
  Zap,
  Sparkles,
  Motorbike,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { axios, currency, isOwner, user } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalMotors: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    activeBookings: 0,
    monthlyRevenue: 0,
    revenueChange: 0,
    totalEarnings: 0,
    averageRating: 0,
    recentBookings: [],
    popularMotors: [],
    monthlyBookings: [],
  });

  // New state for owner bookings
  const [ownerBookings, setOwnerBookings] = useState([]);

  const dashboardCards = [
    {
      title: "Total Motorcycles",
      value: dashboardData?.totalMotors || 0,
      icon: <Motorbike className="w-5 h-5" />,
      color: "from-blue-500 to-blue-600",
      change: "+2 this month",
      trend: "up",
      percentage: "12%",
      description: "Listed for rent",
    },
    {
      title: "Total Bookings",
      value: dashboardData?.totalBookings || 0,
      icon: <Calendar className="w-5 h-5" />,
      color: "from-purple-500 to-purple-600",
      change: "+15% from last month",
      trend: "up",
      percentage: "15%",
      description: "All-time bookings",
    },
    {
      title: "Pending Bookings",
      value: dashboardData?.pendingBookings || 0,
      icon: <Clock className="w-5 h-5" />,
      color: "from-amber-500 to-amber-600",
      change: "Awaiting approval",
      trend: "neutral",
      description: "Need your attention",
    },
    {
      title: "Active Bookings",
      value: dashboardData?.activeBookings || 0,
      icon: <Activity className="w-5 h-5" />,
      color: "from-emerald-500 to-emerald-600",
      change: "Currently running",
      trend: "up",
      percentage: "8%",
      description: "In progress",
    },
    {
      title: "Completed",
      value: dashboardData?.completedBookings || 0,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "from-indigo-500 to-indigo-600",
      change: "+8 this month",
      trend: "up",
      percentage: "24%",
      description: "Successfully delivered",
    },
    {
      title: "Total Earnings",
      value: `${currency}${(
        dashboardData?.totalEarnings || 0
      ).toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "from-green-500 to-green-600",
      change: `+${dashboardData?.revenueChange || 0}% from last month`,
      trend: dashboardData?.revenueChange > 0 ? "up" : "down",
      percentage: `${dashboardData?.revenueChange || 0}%`,
      description: "Lifetime revenue",
    },
  ];

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/motor/owner/dashboard");
      if (data.success) {
        setDashboardData(
          data.dashboardData || {
            totalMotors: 0,
            totalBookings: 0,
            pendingBookings: 0,
            completedBookings: 0,
            activeBookings: 0,
            monthlyRevenue: 0,
            revenueChange: 0,
            totalEarnings: 0,
            averageRating: 0,
            recentBookings: [],
            popularMotors: [],
            monthlyBookings: [],
          }
        );
      } else {
        toast.error(data.message || "Failed to load dashboard data");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load dashboard data"
      );
      // Set default data on error
      setDashboardData({
        totalMotors: 0,
        totalBookings: 0,
        pendingBookings: 0,
        completedBookings: 0,
        activeBookings: 0,
        monthlyRevenue: 0,
        revenueChange: 0,
        totalEarnings: 0,
        averageRating: 4.8,
        recentBookings: [],
        popularMotors: [],
        monthlyBookings: [],
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch owner bookings
  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get("/api/motor/bookings/owner");
      if (data.success) {
        setOwnerBookings(data.bookings || []);
      }
    } catch (error) {
      console.error("Bookings error:", error);
      toast.error(error.response?.data?.message || "Failed to load bookings");
      setOwnerBookings([]);
    }
  };

  // Function to calculate number of days between dates
  const calculateDays = (pickupDate, returnDate) => {
    if (!pickupDate || !returnDate) return 1;
    try {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays || 1;
    } catch (error) {
      return 1;
    }
  };

  // Function to calculate booking amount
  const calculateBookingAmount = (booking) => {
    try {
      // Try totalPrice first (from Booking model)
      if (booking.totalPrice !== undefined) return Number(booking.totalPrice);

      // Try price (for backward compatibility)
      if (booking.price !== undefined) return Number(booking.price);

      // Calculate from motor price per day
      if (booking.motor?.pricePerDay) {
        const days = calculateDays(booking.pickupDate, booking.returnDate);
        return Number(booking.motor.pricePerDay) * days;
      }

      return 0;
    } catch (error) {
      console.error("Error calculating booking amount:", error);
      return 0;
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
      fetchOwnerBookings();
    }
  }, [isOwner]);

  if (loading) return <LoadingScreen />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-blue-50/20 p-4 md:p-6"
    >
      {/* Header with Welcome & Stats */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Welcome back, {user?.name?.split(" ")[0] || "Owner"}!
                </h1>
              </div>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Here's what's happening with your motorcycle rental business
                today. Stay on top of your performance and bookings.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100">
              <div className="text-sm">
                <div className="text-gray-500">Performance Score</div>
                <div className="flex items-center gap-2">
                  <div className="text-xl font-bold text-gray-900">94%</div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Excellent
                  </span>
                </div>
              </div>
              <div className="w-12 h-12">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path
                    className="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="3"
                  />
                  <path
                    className="circle"
                    strokeDasharray="94, 100"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <button
              onClick={() => {
                fetchDashboardData();
                fetchOwnerBookings();
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              Refresh Data
            </button>
          </motion.div>
        </div>
      </div>

      {/* Stats Grid - Modern Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {dashboardCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ y: 30, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group"
          >
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
              {/* Gradient background overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              {/* Top section with icon and trend */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${card.color} shadow-md`}
                >
                  {card.icon}
                </div>
                <div className="flex items-center gap-1">
                  {card.trend === "up" ? (
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-medium">
                      <ArrowUpRight className="w-3 h-3" />
                      <span>{card.percentage}</span>
                    </div>
                  ) : card.trend === "down" ? (
                    <div className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 rounded-lg text-xs font-medium">
                      <ArrowDownRight className="w-3 h-3" />
                      <span>{card.percentage}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium">
                      <Clock className="w-3 h-3" />
                      <span>Pending</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Main value */}
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {card.value}
              </h3>

              {/* Title and description */}
              <p className="text-gray-900 font-semibold mb-1">{card.title}</p>
              <p className="text-gray-500 text-sm mb-4">{card.description}</p>

              {/* Progress bar */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{card.percentage || "—"}</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: card.percentage || "70%" }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full rounded-full ${
                      card.trend === "up"
                        ? "bg-gradient-to-r from-green-400 to-green-500"
                        : card.trend === "down"
                        ? "bg-gradient-to-r from-red-400 to-red-500"
                        : "bg-gradient-to-r from-amber-400 to-amber-500"
                    }`}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue & Performance Chart - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue Card with Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Revenue Overview
                </h2>
                <p className="text-gray-600">Monthly revenue performance</p>
              </div>
              <div className="flex items-center gap-3">
                <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                  <option>All Time</option>
                </select>
                <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Chart Visualization */}
            <div className="relative">
              {/* Chart bars */}
              <div className="flex items-end justify-between h-48 mb-8">
                {dashboardData?.monthlyBookings?.map((month, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{
                      height: `${Math.min(100, (month.bookings || 0) * 10)}%`,
                    }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 cursor-pointer group relative">
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {currency}
                        {Math.round(
                          (month.bookings || 0) * 1500
                        ).toLocaleString()}
                      </div>
                    </div>
                    <span className="mt-3 text-sm text-gray-500 font-medium">
                      {month.month || `Month ${index + 1}`}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Chart info */}
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {currency}
                        {(dashboardData?.monthlyRevenue || 0).toLocaleString()}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-1 ${
                        dashboardData?.revenueChange > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {dashboardData?.revenueChange > 0 ? (
                        <ArrowUpRight className="w-5 h-5" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5" />
                      )}
                      <span className="font-semibold">
                        {dashboardData?.revenueChange > 0 ? "+" : ""}
                        {(dashboardData?.revenueChange || 0).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Booking Growth</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {dashboardData?.monthlyBookings?.[5]?.bookings || 0}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-semibold">+12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Recent Bookings
                  </h2>
                  <p className="text-gray-600">Latest customer activity</p>
                </div>
                <button
                  onClick={() => navigate(`/owner/manage-bookings`)}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 group cursor-pointer"
                >
                  View All Bookings
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Motorcycle
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ownerBookings?.slice(0, 5).map((booking, index) => {
                    const bookingAmount = calculateBookingAmount(booking);
                    const days = calculateDays(
                      booking.pickupDate,
                      booking.returnDate
                    );

                    return (
                      <motion.tr
                        key={booking._id || index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                              <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">
                                {booking.user?.name || "Anonymous"}
                              </div>
                              <div className="text-sm text-gray-500">
                                {booking.user?.email || "No email"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                booking.motor?.image || "/placeholder-motor.jpg"
                              }
                              alt={booking.motor?.brand || "Motorcycle"}
                              className="w-12 h-12 rounded-lg object-cover"
                              onError={(e) => {
                                e.target.src = "/placeholder-motor.jpg";
                              }}
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                {booking.motor?.brand || "Unknown"}{" "}
                                {booking.motor?.model || ""}
                              </div>
                              <div className="text-sm text-gray-500">
                                {booking.motor?.category || "Motorcycle"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.pickupDate
                                ? new Date(
                                    booking.pickupDate
                                  ).toLocaleDateString()
                                : "N/A"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {days} day{days !== 1 ? "s" : ""}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="font-bold text-gray-900 flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-green-600" />
                              {currency}
                              {bookingAmount.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              {booking.motor?.pricePerDay
                                ? `${currency}${booking.motor.pricePerDay}/5km`
                                : "Rate not specified"}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              booking.status === "confirmed"
                                ? "bg-blue-100 text-blue-800"
                                : booking.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : booking.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {booking.status?.charAt(0).toUpperCase() +
                              (booking.status?.slice(1) || "") || "Unknown"}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => navigate(`/owner/manage-bookings`)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>

              {(!ownerBookings || ownerBookings.length === 0) && (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No bookings yet
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    When customers book your motorcycles, they will appear here.
                    Start by promoting your listings!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Insights & Quick Actions */}
        <div className="space-y-6">
          {/* Performance Summary */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">Performance</h3>
                  <p className="text-gray-300">This month's highlights</p>
                </div>
                <Award className="w-8 h-8 text-yellow-400" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Success Rate</span>
                  <span className="font-bold text-green-400">94%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Avg. Response Time</span>
                  <span className="font-bold">12min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Customer Rating</span>
                  <span className="font-bold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    {(dashboardData?.averageRating || 4.8).toFixed(1)}/5
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Utilization Rate</span>
                  <span className="font-bold">
                    {Math.round(
                      ((dashboardData?.activeBookings || 0) /
                        (dashboardData?.totalMotors || 1)) *
                        100
                    )}
                    %
                  </span>
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center gap-2">
                <Target className="w-4 h-4" />
                View Full Report
              </button>
            </div>
          </div>

          {/* Popular Motorcycles */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Popular Motorcycles
                </h3>
                <p className="text-gray-600">Most booked this month</p>
              </div>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {dashboardData?.popularMotors?.slice(0, 3).map((motor, index) => (
                <div
                  key={motor._id || index}
                  className="group p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/30 rounded-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-blue-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={motor.image || "/placeholder-motor.jpg"}
                        alt={`${motor.brand || ""} ${motor.model || ""}`}
                        className="w-14 h-14 rounded-lg object-cover"
                        onError={(e) => {
                          e.target.src = "/placeholder-motor.jpg";
                        }}
                      />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 truncate">
                        {motor.brand || "Unknown"} {motor.model || ""}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-500">
                          {motor.bookings || 0} bookings
                        </span>
                        <span className="flex items-center gap-1 text-sm">
                          <Star className="w-3 h-3 fill-current text-yellow-400" />
                          {(motor.rating || 4.5).toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="font-bold text-gray-900 whitespace-nowrap">
                      {currency}
                      {motor.pricePerDay || 0}
                      <span className="text-xs font-normal text-gray-500">
                        /5km
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate(`/owner/add-motor`)}
              className="w-full mt-4 py-3 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-blue-600 font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Plus className="w-4 h-4" />
              Add New Motorcycle
            </button>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Quick Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {ownerBookings?.reduce((acc, booking) => {
                        if (booking.user && !acc.includes(booking.user._id)) {
                          acc.push(booking.user._id);
                        }
                        return acc;
                      }, []).length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Customers</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {dashboardData?.totalMotors || 0}
                    </div>
                    <div className="text-sm text-gray-600">Active Listings</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round((dashboardData?.averageRating || 4.8) * 20)}%
                    </div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">8</div>
                    <div className="text-sm text-gray-600">Cities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-6 right-6 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/owner/manage-bookings`)}
            className="p-3 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow border border-gray-100"
          >
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => navigate(`/owner/manage-motors`)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Motorcycle
          </button>
        </div>
      </div>

      {/* Custom CSS for circular chart */}
      <style jsx>{`
        .circular-chart {
          display: block;
          max-width: 100%;
          max-height: 100%;
        }

        .circle {
          stroke-linecap: round;
          animation: progress 1s ease-out forwards;
        }

        @keyframes progress {
          0% {
            stroke-dasharray: 0, 100;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Dashboard;
