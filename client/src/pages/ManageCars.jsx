import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Car,
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
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import LoadingScreen from "../components/LoadingScreen";

const ManageCars = () => {
  const { isOwner, axios, currency, fecthCars } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  const fetchOwnerCars = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/owner/cars");
      if (data.success) {
        setCars(data.cars);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
        fecthCars();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update availability"
      );
    }
  };

  const handleDeleteClick = (car) => {
    setCarToDelete(car);
    setShowDeleteModal(true);
  };

  const deleteCar = async () => {
    if (!carToDelete) return;

    try {
      const { data } = await axios.post("/api/owner/delete-car", {
        carId: carToDelete._id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
        fecthCars();
        setShowDeleteModal(false);
        setCarToDelete(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete car");
    }
  };

  // Filter cars based on search and status
  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      searchTerm === "" ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "available" && car.isAvaliable) ||
      (filterStatus === "unavailable" && !car.isAvaliable);

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    if (isOwner) {
      fetchOwnerCars();
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
            <h1 className="text-3xl font-bold text-gray-900">Manage Cars</h1>
            <p className="text-gray-600 mt-2">
              View all listed cars, update their details, or remove them from
              the booking platform.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Total Cars
              </h3>
              <p className="text-3xl font-bold mt-2">{cars.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Available</h3>
              <p className="text-3xl font-bold mt-2">
                {cars.filter((car) => car.isAvaliable).length}
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
                {cars.filter((car) => !car.isAvaliable).length}
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
                Avg. Price
              </h3>
              <p className="text-3xl font-bold mt-2">
                {currency}
                {cars.length > 0
                  ? Math.round(
                      cars.reduce((acc, car) => acc + car.pricePerDay, 0) /
                        cars.length
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
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search cars by brand, model, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
            <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {filteredCars.map((car, index) => (
          <motion.div
            key={car._id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Car Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    car.isAvaliable
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {car.isAvaliable ? "Available" : "Booked"}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="text-white">
                  <h3 className="text-xl font-bold">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-white/80">
                    {car.year} • {car.category}
                  </p>
                </div>
              </div>
            </div>

            {/* Car Details */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {currency}
                    {car.pricePerDay}
                    <span className="text-sm font-normal text-gray-500">
                      {" "}
                      /5km
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Insured</span>
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Fuel className="w-4 h-4" />
                  <span className="text-sm">{car.fuel_type}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">{car.transmission}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{car.seating_capacity} seats</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm truncate">{car.location}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => toggleAvailability(car._id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    car.isAvaliable
                      ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                  }`}
                >
                  {car.isAvaliable ? (
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
                    onClick={() => handleDeleteClick(car)}
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
      {filteredCars.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
          <div className="text-5xl mb-4">🚗</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No cars found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== "all"
              ? "No cars match your search criteria. Try different filters."
              : "You haven't listed any cars yet. Add your first car to start renting!"}
          </p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 inline-flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Your First Car
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && carToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
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
                Delete {carToDelete.brand} {carToDelete.model}?
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this car? This action cannot be
                undone and will permanently remove the car from the platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setCarToDelete(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteCar}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Car
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>
          Showing {filteredCars.length} of {cars.length} cars • Updated just now
        </p>
      </div>
    </motion.div>
  );
};

export default ManageCars;
