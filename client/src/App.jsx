import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddCar from "./pages/owner/AddCar";
import ManageCars from "./pages/ManageCars";
import ManageBookings from "./pages/owner/ManageBookings";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact ";
import Careers from "./pages/Careers";
import Favorite from "./pages/Favorite";
import AddMotor from "./pages/owner/AddMotor";
import MotorDetails from "./pages/MotorDetails";
import Motors from "./pages/Motors";
import ManageMotors from "./pages/ManageMotors";

const App = () => {
  const { showLogin, user } = useAppContext();
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  return (
    <>
      <Toaster />
      {showLogin && <Login />}
      {!isOwnerPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/motor-details/:id" element={<MotorDetails />} />
        <Route path="/motors" element={<Motors />} />
        <Route path="/bookings" element={user ? <MyBookings /> : <Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/favorite" element={user ? <Favorite /> : <Home />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-motor" element={<AddMotor />} />
          <Route path="manage-motors" element={<ManageMotors />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
