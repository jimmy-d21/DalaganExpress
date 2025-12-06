import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
  Car,
  Shield,
  FileText,
  HelpCircle,
  Navigation,
  ChevronRight,
  Fuel,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Bikes", path: "/bikes" },
    { name: "List Your Bikes", path: "/owner" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" },
  ];

  const resources = [
    { name: "Help Center", icon: <HelpCircle className="w-4 h-4" /> },
    { name: "Terms of Service", icon: <FileText className="w-4 h-4" /> },
    { name: "Privacy Policy", icon: <Shield className="w-4 h-4" /> },
    { name: "Insurance", icon: <Shield className="w-4 h-4" /> },
    { name: "FAQs", icon: <HelpCircle className="w-4 h-4" /> },
    { name: "Blog", icon: <FileText className="w-4 h-4" /> },
  ];

  const contactInfo = [
    {
      icon: <MapPin className="w-4 h-4" />,
      text: "1234 Luxury Drive, San Francisco, CA 94107",
    },
    { icon: <Phone className="w-4 h-4" />, text: "+1 (234) 567-890" },
    { icon: <Mail className="w-4 h-4" />, text: "info@dalaganexpress.com" },
  ];

  const socialLinks = [
    {
      icon: <Facebook className="w-5 h-5" />,
      name: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      name: "Instagram",
      color: "hover:text-pink-600",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      name: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      name: "Email",
      color: "hover:text-red-500",
    },
  ];

  const handleLinkClick = (path) => {
    // Navigate to the route
    navigate(path);
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16"></div>
      </div>

      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"></div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Brand & Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <button
                onClick={() => handleLinkClick("/")}
                className="flex items-center gap-3 group text-left w-fit"
              >
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
                  <span className="text-2xl font-semibold text-blue-800 -mb-1">
                    Dalagan
                  </span>
                  <span className="text-lg font-semibold text-yellow-300">
                    Express
                  </span>
                </div>
              </button>

              <p className="text-gray-300 max-w-md leading-relaxed">
                Experience premium automotive excellence with our curated fleet
                of luxury vehicles. We deliver unmatched quality, service, and
                adventure for every journey.
              </p>

              {/* Social Links */}
              <div className="space-y-3">
                <p className="text-gray-400 text-sm font-medium">Follow Us</p>
                <div className="flex items-center gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.button
                      key={index}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      onClick={() => window.open("#", "_blank")}
                      className={`p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 ${social.color}`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="space-y-3">
                <p className="text-gray-400 text-sm font-medium">
                  Stay Updated
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:shadow-lg transition-shadow"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Links & Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-blue-400" />
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <button
                        onClick={() => handleLinkClick(link.path)}
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group w-full text-left"
                      >
                        <ChevronRight className="w-3 h-3 text-blue-400 group-hover:translate-x-1 transition-transform" />
                        <span>{link.name}</span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Resources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  Resources
                </h3>
                <ul className="space-y-3">
                  {resources.map((resource, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <button
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                          // You can add actual navigation for these pages if they exist
                          if (resource.name === "Help Center") {
                            handleLinkClick("/help");
                          } else if (resource.name === "Privacy Policy") {
                            handleLinkClick("/privacy");
                          }
                          // Add other resource navigation as needed
                        }}
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group w-full text-left"
                      >
                        <div className="text-blue-400">{resource.icon}</div>
                        <span>{resource.name}</span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  Contact Us
                </h3>
                <ul className="space-y-4">
                  {contactInfo.map((contact, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <div className="mt-0.5 text-blue-400">{contact.icon}</div>
                      <span>{contact.text}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Business Hours */}
                <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-sm font-semibold text-white mb-2">
                    Business Hours
                  </h4>
                  <p className="text-sm text-gray-300">Mon - Sun: 24/7</p>
                  <p className="text-sm text-gray-300">
                    Support: Always Available
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* App Download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-white/10"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Download Our App
                </h3>
                <p className="text-gray-300">
                  Book rides, manage reservations, and get exclusive deals on
                  the go.
                </p>
              </div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:shadow-lg transition-all"
                  onClick={() => window.open("#", "_blank")}
                >
                  App Store
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:shadow-lg transition-all"
                  onClick={() => window.open("#", "_blank")}
                >
                  Google Play
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-white/10 py-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © {currentYear}{" "}
                <span className="text-blue-800 font-semibold">
                  Dalagan <span className="text-yellow-300">Express</span>
                </span>
                . All rights reserved.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Premium Car Rental Service
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (item, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                        // Add navigation for these pages if they exist
                        if (item === "Privacy Policy") {
                          handleLinkClick("/privacy");
                        } else if (item === "Terms of Service") {
                          handleLinkClick("/terms");
                        } else if (item === "Cookie Policy") {
                          handleLinkClick("/cookies");
                        }
                      }}
                      className="hover:text-white transition-colors"
                    >
                      {item}
                    </motion.button>
                  )
                )}
              </div>

              {/* Payment Methods */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">VISA</span>
                </div>
                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">MC</span>
                </div>
                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                  <span className="text-xs">PP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>100% Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="w-4 h-4 text-blue-400" />
              <span>500+ Premium Vehicles</span>
            </div>
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span>24/7 Customer Support</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Back to Top Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-40 p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all"
          aria-label="Scroll to top"
        >
          <Navigation className="w-6 h-6 transform rotate-90" />
        </motion.button>
      </div>
    </motion.footer>
  );
};

export default Footer;
