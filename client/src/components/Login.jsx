import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Bike,
  Sparkles,
  Motorbike,
  Shield,
} from "lucide-react";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate, fetchUser } =
    useAppContext();
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (state === "register") {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return false;
      }
    }
    return true;
  };

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      // Validate form before submission
      if (!validateForm()) {
        return;
      }

      setIsLoading(true);

      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        toast.success(
          state === "login"
            ? "Welcome back! 🏍️"
            : "Account created successfully! 🎉"
        );
        setToken(data.token);
        localStorage.setItem("token", data.token);
        await fetchUser();
        navigate("/");
        setShowLogin(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const toggleState = (newState) => {
    setState(newState);
    resetForm();
  };

  const isPasswordMatch = () => {
    if (state === "login" || !confirmPassword) return true;
    return password === confirmPassword;
  };

  const getPasswordStrength = () => {
    if (password.length === 0)
      return { strength: 0, color: "bg-gray-200", text: "" };
    if (password.length < 6)
      return { strength: 25, color: "bg-red-500", text: "Weak" };
    if (password.length < 8)
      return { strength: 50, color: "bg-orange-500", text: "Fair" };
    if (password.length < 10)
      return { strength: 75, color: "bg-yellow-500", text: "Good" };
    return { strength: 100, color: "bg-green-500", text: "Strong" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowLogin(false)}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.form
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onSubmit={onSubmitHandler}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md overflow-hidden bg-gradient-to-br from-white via-orange-50/50 to-white rounded-3xl shadow-2xl border border-orange-100"
        >
          {/* Header */}
          <div className="relative p-8 pb-6">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowLogin(false)}
              className="absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo & Title */}
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-orange-100 shadow-lg">
                  <img
                    src="/dalagan-express.jpg"
                    alt="Dalagan Express"
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-2 border-2 border-orange-400/30 rounded-full"
                />
              </div>

              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {state === "login" ? "Welcome Back" : "Join the Ride"}
                </h2>
                <p className="text-gray-600">
                  {state === "login"
                    ? "Sign in to continue your adventure"
                    : "Create your account and start riding"}
                </p>
              </div>
            </div>

            {/* Form Content */}
            <div className="space-y-6">
              {state === "register" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2"
                >
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <User className="w-4 h-4 text-orange-500" />
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      type="text"
                      required={state === "register"}
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </motion.div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Mail className="w-4 h-4 text-orange-500" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    type="email"
                    required
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Lock className="w-4 h-4 text-orange-500" />
                  Password
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator (only for register) */}
                {state === "register" && password.length > 0 && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Password strength</span>
                      <span className="font-medium text-gray-700">
                        {passwordStrength.text}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength.strength}%` }}
                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      {password.length < 6
                        ? "Must be at least 6 characters"
                        : "✓ Good to go"}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password Field (only for register) */}
              {state === "register" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2"
                >
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Shield className="w-4 h-4 text-orange-500" />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      placeholder="Re-enter your password"
                      className={`w-full pl-12 pr-12 py-3 bg-white border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                        !isPasswordMatch() && confirmPassword
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-orange-500 focus:border-transparent"
                      }`}
                      type={showConfirmPassword ? "text" : "password"}
                      required={state === "register"}
                    />
                    <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Password Match Indicator */}
                  {confirmPassword && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      {isPasswordMatch() ? (
                        <>
                          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                          </div>
                          <span className="text-green-600">
                            Passwords match
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                            <X className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-red-600">
                            Passwords do not match
                          </span>
                        </>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={
                  isLoading || (state === "register" && !isPasswordMatch())
                }
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Motorbike className="w-5 h-5" />
                    <span>
                      {state === "login" ? "Sign In" : "Create Account"}
                    </span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              {/* Switch Form */}
              <div className="text-center pt-4">
                <p className="text-gray-600">
                  {state === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <button
                    type="button"
                    onClick={() =>
                      toggleState(state === "login" ? "register" : "login")
                    }
                    className="ml-2 font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    {state === "login" ? "Sign up now" : "Sign in instead"}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Footer Benefits */}
          <div className="border-t border-gray-200 bg-gradient-to-r from-orange-50 to-red-50/50 p-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-lg font-bold text-orange-600">500+</div>
                <div className="text-xs text-gray-600">Premium Bikes</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-bold text-orange-600">24/7</div>
                <div className="text-xs text-gray-600">Roadside Support</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-bold text-orange-600">$0</div>
                <div className="text-xs text-gray-600">Booking Fee</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-bold text-orange-600">100%</div>
                <div className="text-xs text-gray-600">Secure</div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-full translate-x-16 translate-y-16"></div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;
