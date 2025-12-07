import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Motors Related
  const [motors, setMotors] = useState([]);
  const [allBookings, setAllBookings] = useState([]);

  // Function to reset global search
  const resetGlobalSearch = () => {
    setGlobalSearchQuery("");
    setGlobalPickupLocation("");
    setGlobalPickupDate("");
    setGlobalReturnDate("");
    setGlobalBikeType("");
    setGlobalSearchMode("simple");
  };

  // Function to check user is logged in
  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/api/motor/user/data`);
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to fecth to all motors from server
  const fetchMotors = async () => {
    try {
      const { data } = await axios.get("/api/motor/user/motors");

      if (data.success) {
        setMotors(data.motors);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const fetchAllBookings = async () => {
    try {
      const { data } = await axios.get("/api/motor/bookings/user");
      if (data.success) {
        setAllBookings(data.bookings);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user");
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to fecth to all cars from server
  const fecthCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      if (data.success) {
        setCars(data.cars);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to logout the user
  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    resetGlobalSearch(); // Reset search on logout
    navigate("/");
    axios.defaults.headers.common["Authorization"] = "";
    toast.success("You have been logged out");
  };

  // useEffect to retrieve the token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    fecthCars();
    fetchMotors();
  }, []);

  // useEffect to fetch user data when token is available
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
      fetchUser();
    }
  }, [token]);

  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fecthCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    fetchMyBookings,
    bookings,

    // Motor Related
    motors,
    setMotors,
    fetchMotors,
    allBookings,
    fetchAllBookings,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};
