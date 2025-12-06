import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { motion } from "framer-motion";

const NavbarOwner = () => {
  const { user } = useAppContext();

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-12 h-12 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow"
          >
            <img
              src="/dalagan-express.jpg"
              alt="Dalagan Express Logo"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -inset-1 border-2 border-orange-400/30 rounded-full"
          ></motion.div>
        </div>
        <div className="flex flex-col">
          <span className={`text-2xl font-semibold text-blue-800 -mb-1`}>
            Dalagan
          </span>
          <span className="text-lg font-semibold text-yellow-300 ">
            Express
          </span>
        </div>
      </Link>
      <p>Welcome, {user?.name || "Owner"}</p>
    </div>
  );
};

export default NavbarOwner;
