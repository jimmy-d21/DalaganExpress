import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bike,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Shield,
  Fuel,
  Users,
  Settings,
  Plus,
  Filter,
  Search,
  Calendar,
  CheckCircle,
  XCircle,
  DollarSign,
  MapPin,
  Gauge,
  Wind,
  Zap,
  AlertCircle,
  Motorbike,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import LoadingScreen from "../components/LoadingScreen";

const ManageMotors = () => {
  const { isOwner, axios, currency, fetchMotors, navigate } = useAppContext(); // Fixed: fecthMotors → fetchMotors
  const [loading, setLoading] = useState(true);
  const [motors, setMotors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [motorToDelete, setMotorToDelete] = useState(null);

  const fetchOwnerMotors = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/motor/owner/motors");
      if (data.success) {
        setMotors(data.motors);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load motorcycles"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (motorId) => {
    try {
      const { data } = await axios.post("/api/motor/owner/toggle-motor", {
        motorId,
      });
      if (data.success) {
        toast.success(data.message);
        fetchMotors();
        setMotors((prev) =>
          prev.map((motor) =>
            motor._id === motorId ? data.updatedMotor : motor
          )
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update availability"
      );
    }
  };

  const handleDeleteClick = (motor) => {
    setMotorToDelete(motor);
    setShowDeleteModal(true);
  };

  const deleteMotor = async () => {
    if (!motorToDelete) return;

    try {
      const { data } = await axios.post("/api/motor/owner/delete-motor", {
        motorId: motorToDelete._id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerMotors();
        fetchMotors(); // Fixed: fecthMotors → fetchMotors
        setShowDeleteModal(false);
        setMotorToDelete(null);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete motorcycle"
      );
    }
  };

  // Filter motors based on search, status, and type
  const filteredMotors = motors.filter((motor) => {
    const matchesSearch =
      searchTerm === "" ||
      motor.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      motor.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      motor.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "available" && motor.isAvailable) || // Fixed: isAvaliable → isAvailable
      (filterStatus === "unavailable" && !motor.isAvailable); // Fixed: isAvaliable → isAvailable

    const matchesType =
      filterType === "all" ||
      motor.category?.toLowerCase() === filterType.toLowerCase(); // Changed: type → category

    return matchesSearch && matchesStatus && matchesType;
  });

  // Get motorcycle types for filter
  const motorTypes = [
    ...new Set(motors.map((motor) => motor.category).filter(Boolean)), // Changed: type → category
  ];

  useEffect(() => {
    if (isOwner) {
      fetchOwnerMotors();
    }
  }, [isOwner]);

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
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-md">
                <Bike className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Manage Motorcycles
              </h1>
            </div>
            <p className="text-gray-600 mt-2">
              View all listed motorcycles, update their details, or remove them
              from the rental platform. Track performance and manage
              availability.
            </p>
          </div>
          <button
            onClick={() => navigate("/owner/add-motor")}
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Motorcycle
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Total Motorcycles
              </h3>
              <p className="text-3xl font-bold mt-2">{motors.length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-xl">
              <Motorbike className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Available</h3>
              <p className="text-3xl font-bold mt-2">
                {motors.filter((motor) => motor.isAvailable).length}{" "}
                {/* Fixed: isAvaliable → isAvailable */}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Booked</h3>
              <p className="text-3xl font-bold mt-2">
                {motors.filter((motor) => !motor.isAvailable).length}{" "}
                {/* Fixed: isAvaliable → isAvailable */}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Avg. Price/Day
              </h3>
              <p className="text-3xl font-bold mt-2">
                {currency}
                {motors.length > 0
                  ? Math.round(
                      motors.reduce(
                        (acc, motor) => acc + motor.pricePerDay,
                        0
                      ) / motors.length
                    )
                  : 0}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by brand, model, or engine size..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {motorTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
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

      {/* Motors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {filteredMotors.map((motor, index) => (
          <motion.div
            key={motor._id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            {/* Motorcycle Image */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
              <img
                src={motor.image}
                alt={`${motor.brand} ${motor.model}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    motor.isAvailable // Fixed: isAvaliable → isAvailable
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {motor.isAvailable ? "Available" : "Booked"}{" "}
                  {/* Fixed: isAvaliable → isAvailable */}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="text-white">
                  <h3 className="text-xl font-bold">
                    {motor.brand} {motor.model}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {motor.year} • {motor.category} • {motor.engine_cc}cc{" "}
                    {/* Fixed: engineSize → engine_cc */}
                  </p>
                </div>
              </div>
            </div>

            {/* Motorcycle Details */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {currency}
                    {motor.pricePerDay}
                    <span className="text-sm font-normal text-gray-500">
                      {" "}
                      /day
                    </span>
                  </p>
                  {motor.category && ( // Changed: type → category
                    <span className="text-xs font-medium px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                      {motor.category}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Insured</span>
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Zap className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">{motor.engine_cc}cc</span>{" "}
                  {/* Fixed: engineSize → engine_cc */}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Gauge className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{motor.mileage || "N/A"} kmpl</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Fuel className="w-4 h-4" />
                  <span className="text-sm">{motor.fuel_type}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Wind className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{motor.transmission}</span>
                </div>
                {motor.topSpeed && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Bike className="w-4 h-4" />
                    <span className="text-sm">{motor.topSpeed} km/h</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm truncate">{motor.location}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => toggleAvailability(motor._id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    motor.isAvailable // Fixed: isAvaliable → isAvailable
                      ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      : "bg-orange-100 hover:bg-orange-200 text-orange-700"
                  }`}
                >
                  {motor.isAvailable ? ( // Fixed: isAvaliable → isAvailable
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Mark Unavailable
                      </span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Mark Available
                      </span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(motor)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMotors.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
          <div className="text-5xl mb-4">🏍️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No motorcycles found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== "all" || filterType !== "all"
              ? "No motorcycles match your search criteria. Try different filters."
              : "You haven't listed any motorcycles yet. Add your first bike to start renting!"}
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-medium rounded-lg transition-all duration-200 inline-flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Your First Motorcycle
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && motorToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Delete {motorToDelete.brand} {motorToDelete.model}?
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this motorcycle? This action
                cannot be undone and will permanently remove it from the
                platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setMotorToDelete(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteMotor}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Motorcycle
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Performance Metrics */}
      {motors.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Performance Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Most Popular Type</p>
              <p className="text-xl font-bold text-gray-900">
                {(() => {
                  const types = motors.map((m) => m.category); // Changed: type → category
                  const counts = {};
                  types.forEach((type) => {
                    counts[type] = (counts[type] || 0) + 1;
                  });
                  const mostCommon = Object.keys(counts).reduce((a, b) =>
                    counts[a] > counts[b] ? a : b
                  );
                  return mostCommon || "N/A";
                })()}
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Avg. Engine Size</p>
              <p className="text-xl font-bold text-gray-900">
                {Math.round(
                  motors.reduce(
                    (acc, motor) => acc + (parseInt(motor.engine_cc) || 0), // Fixed: engineSize → engine_cc
                    0
                  ) / motors.length
                )}
                cc
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Utilization Rate</p>
              <p className="text-xl font-bold text-gray-900">
                {Math.round(
                  (motors.filter((m) => !m.isAvailable).length / // Fixed: isAvaliable → isAvailable
                    motors.length) *
                    100
                )}
                %
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>
          Showing {filteredMotors.length} of {motors.length} motorcycles •
          Updated just now
        </p>
      </div>
    </motion.div>
  );
};

export default ManageMotors;
