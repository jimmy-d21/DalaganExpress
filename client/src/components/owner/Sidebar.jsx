import React, { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState("");

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const { data } = await axios.post("/api/owner/update-image", formData);
      if (data.success) {
        fetchUser();
        toast.success(data.message);
        setImage("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <aside className="flex flex-col items-center min-h-screen w-64 bg-white border-r border-gray-200 shadow-sm">
      {/* Profile Section */}
      <div className="relative flex flex-col items-center mt-8">
        <label htmlFor="image" className="cursor-pointer group relative">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image
                ? user?.image
                : assets.user_profile
            }
            className="h-20 w-20 rounded-full object-cover border-2 border-primary shadow-md"
            alt="Profile"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="absolute inset-0 bg-black/30 rounded-full hidden group-hover:flex items-center justify-center">
            <img src={assets.edit_icon} alt="edit" className="h-6 w-6" />
          </div>
        </label>

        {image && (
          <button
            onClick={updateImage}
            className="mt-3 px-4 py-1 text-sm bg-primary text-white rounded-md shadow hover:bg-primary/90 transition"
          >
            Save
          </button>
        )}

        <p className="mt-3 text-lg font-semibold text-gray-700">
          {user?.name || "Owner"}
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="mt-10 w-full px-4">
        {ownerMenuLinks.map((link, index) => {
          const isActive = location.pathname === link.path;
          return (
            <NavLink
              key={index}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-md mb-2 transition-all ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <img
                src={isActive ? link.coloredIcon : link.icon}
                alt="menu icon"
                className="h-5 w-5"
              />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
