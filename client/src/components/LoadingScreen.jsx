import React from "react";

const LoadingScreen = () => {
  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>

        {/* Loading Text */}
        <p className="text-white text-lg font-semibold">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
