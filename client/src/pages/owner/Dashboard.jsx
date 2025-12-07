import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Car,
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
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import LoadingScreen from "../../components/LoadingScreen";

const Dashboard = () => {
  const { axios, currency, isOwner } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    activeBookings: 0,
    monthlyRevenue: 0,
    revenueChange: 12.5, // Percentage change
    totalEarnings: 0,
    averageRating: 4.8,
    recentBookings: [],
    popularCars: [],
    monthlyBookings: [],
  });

  const dashboardCards = [
    {
      title: "Total Cars",
      value: stats?.totalCars,
      icon: <Car className="w-6 h-6" />,
      color: "blue",
      change: "+2 this month",
      trend: "up",
    },
    {
      title: "Total Bookings",
      value: stats?.totalBookings,
      icon: <Calendar className="w-6 h-6" />,
      color: "purple",
      change: "+15% from last month",
      trend: "up",
    },
    {
      title: "Pending Bookings",
      value: stats?.pendingBookings,
      icon: <Clock className="w-6 h-6" />,
      color: "yellow",
      change: "Awaiting approval",
      trend: "neutral",
    },
    {
      title: "Active Bookings",
      value: stats?.activeBookings,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "green",
      change: "Currently running",
      trend: "up",
    },
    {
      title: "Completed",
      value: stats?.completedBookings,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "indigo",
      change: "+8 this month",
      trend: "up",
    },
    {
      title: "Total Earnings",
      value: `${currency}${stats?.totalEarnings?.toLocaleString()}`,
      icon: <DollarSign className="w-6 h-6" />,
      color: "emerald",
      change: "+12.5% from last month",
      trend: "up",
    },
  ];

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/motor/owner/dashboard");
      if (data.success) {
        setStats(data.dashboardData);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      yellow: "bg-yellow-100 text-yellow-600",
      green: "bg-green-100 text-green-600",
      indigo: "bg-indigo-100 text-indigo-600",
      emerald: "bg-emerald-100 text-emerald-600",
      red: "bg-red-100 text-red-600",
    };
    return colors[color] || colors.blue;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Monitor overall platform performance including total cars,
              bookings, revenue, and recent activities.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-sm text-gray-500">Current Month</div>
              <div className="text-lg font-bold text-gray-900">
                {new Date().toLocaleDateString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
            <button
              onClick={fetchDashboardData}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <TrendingUp className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {dashboardCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${getColorClasses(card.color)}`}>
                {card.icon}
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  card.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {card.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : card.trend === "down" ? (
                  <ArrowDownRight className="w-4 h-4" />
                ) : null}
                <span>{card.change}</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {card.value}
            </h3>
            <p className="text-gray-600 font-medium">{card.title}</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div
                className={`h-1 rounded-full ${
                  card.trend === "up"
                    ? "bg-green-500"
                    : card.trend === "down"
                    ? "bg-red-500"
                    : "bg-gray-300"
                }`}
              ></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Bookings - 2/3 width */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Bookings
                </h2>
                <p className="text-gray-600">
                  Latest customer bookings and their status
                </p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                View All
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Customer & Car
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Dates
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentBookings?.slice(0, 5).map((booking, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={booking.car?.image}
                            alt={booking.car?.brand}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {booking.car?.brand} {booking.car?.model}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.user?.name || "Anonymous"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <div className="font-medium">
                            {new Date(booking.pickupDate).toLocaleDateString()}
                          </div>
                          <div className="text-gray-500">
                            to{" "}
                            {new Date(booking.returnDate).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-gray-900">
                          {currency}
                          {booking.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.noOfDays} days
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {(!stats?.recentBookings ||
                stats.recentBookings.length === 0) && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg">
                    No recent bookings
                  </div>
                  <p className="text-gray-500 mt-2">
                    When customers book your cars, they will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Stats & Info */}
        <div className="space-y-6">
          {/* Revenue Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">Monthly Revenue</h3>
                <p className="text-blue-100">Revenue for current month</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-200" />
            </div>
            <div className="mb-4">
              <div className="text-3xl font-bold mb-2">
                {currency}
                {stats?.monthlyRevenue?.toLocaleString()}
              </div>
              <div className="flex items-center gap-2 text-blue-200">
                <ArrowUpRight className="w-4 h-4" />
                <span>+{stats.revenueChange}% from last month</span>
              </div>
            </div>
            <div className="h-2 bg-blue-500/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    (stats.monthlyRevenue / 10000) * 100
                  )}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Popular Cars */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Popular Cars
            </h3>
            <div className="space-y-4">
              {stats?.popularCars?.slice(0, 3).map((car, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <img
                    src={car.image}
                    alt={car.brand}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {car.brand} {car.model}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <span>{car.bookings} bookings</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current text-yellow-400" />
                        {car.rating}
                      </span>
                    </div>
                  </div>
                  <div className="font-bold text-gray-900">
                    {currency}
                    {car.pricePerDay}/day
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700">Active Customers</span>
                </div>
                <span className="font-bold text-gray-900">142</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-gray-700">Insured Cars</span>
                </div>
                <span className="font-bold text-gray-900">
                  {stats.totalCars}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700">Cities Served</span>
                </div>
                <span className="font-bold text-gray-900">8</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-600 fill-current" />
                  </div>
                  <span className="text-gray-700">Avg. Rating</span>
                </div>
                <span className="font-bold text-gray-900">
                  {stats.averageRating}/5
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Chart Placeholder */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Booking Trends</h2>
            <p className="text-gray-600">Monthly booking statistics</p>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Last 6 Months</option>
            <option>Last Year</option>
            <option>All Time</option>
          </select>
        </div>

        {/* Chart Placeholder */}
        <div className="h-64 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg">
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Booking Analytics
            </h3>
            <p className="text-gray-600 max-w-md">
              Visual representation of monthly bookings and revenue trends will
              appear here.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-gray-500 text-sm py-4">
        <p>
          Dashboard updated automatically • Last refreshed:{" "}
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
};

export default Dashboard;
