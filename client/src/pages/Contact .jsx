import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Bike,
  Shield,
  Users,
  CheckCircle,
  Navigation,
  Bike as Motorcycle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      details: "+63 34 456 7890",
      description: "Available 24/7",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: "hello@dalaganexpress.ph",
      description: "Response within 2 hours",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Our Office",
      details: "Lacson Street",
      description: "Bacolod City, Negros Occidental",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: "6 AM - 10 PM",
      description: "Daily, Including Holidays",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const faqs = [
    {
      question: "What documents do I need to rent a motor in Negros?",
      answer:
        "You'll need a valid Philippine driver's license (or international license for foreigners), one valid ID, and a security deposit.",
    },
    {
      question: "Can I rent a motor for island hopping around Negros?",
      answer:
        "Yes! We offer special packages for island exploration. Ask about our Negros Island tour packages with optional guide services.",
    },
    {
      question: "Do you offer pick-up/drop-off at Bacolod-Silay Airport?",
      answer:
        "Absolutely! We provide free airport transfer for rentals of 3 days or more. Additional fee applies for shorter rentals.",
    },
    {
      question: "What's included in the rental price?",
      answer:
        "Our rental prices include comprehensive insurance, 24/7 roadside assistance in Negros, unlimited mileage within Negros Island, and basic maintenance.",
    },
    {
      question: "Can I ride the rental to other Visayas islands?",
      answer:
        "Yes, with prior arrangement. We offer inter-island ferry arrangements and provide necessary travel permits for island-hopping adventures.",
    },
    {
      question: "Do you have motors suitable for Negros mountain roads?",
      answer:
        "Yes! We have adventure motorcycles perfect for Negros' mountain terrain, sugar plantation roads, and beach drives.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 opacity-10"></div>
        {/* Negros Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-blue-500/20 backdrop-blur-sm rounded-full"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm font-medium text-blue-300">
                Tabi diri! (Come Here!)
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Kumusta from{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                Negros
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Your trusted motor rental partner in the Sugar Capital of the
              Philippines
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full"
            >
              <MapPin className="w-5 h-5 text-green-400" />
              <span className="text-lg font-medium">
                Serving Bacolod • Silay • Dumaguete • Whole Negros Island
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Methods - Negros Edition */}
      <div className="container mx-auto px-4 py-16 -mt-12">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Reach Us in <span className="text-blue-600">Negros</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're here to help you explore the beauty of Negros Occidental
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full">
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${method.color} mb-4`}
                  >
                    <div className="text-white">{method.icon}</div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 font-medium mb-1">
                    {method.details}
                  </p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Contact Form & Info */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex p-4 bg-green-100 rounded-full mb-6">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Salamat! (Thank You!)
                    </h3>
                    <p className="text-gray-600 mb-6">
                      We'll get back to you within 2 hours. Daghang salamat!
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <MessageSquare className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Send Us a Message
                        </h2>
                        <p className="text-gray-600">
                          Inquiries about Negros travel, rentals, or tours
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Juan Dela Cruz"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="juan@example.com"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Philippine Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+63 912 345 6789"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Subject
                          </label>
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                          >
                            <option value="">Select inquiry type</option>
                            <option value="booking">
                              Motor Rental Booking
                            </option>
                            <option value="negros-tours">
                              Negros Island Tours
                            </option>
                            <option value="airport-pickup">
                              Airport Pickup
                            </option>
                            <option value="long-term">Long-term Rental</option>
                            <option value="business">
                              Business Partnership
                            </option>
                            <option value="other">Other Questions</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Your Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your Negros travel plans or rental needs..."
                          rows="5"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                          required
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Nagpadala... (Sending...)</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Padala Mensahe (Send Message)</span>
                          </>
                        )}
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>

            {/* Contact Info & FAQs - Negros Focus */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Office Location - Bacolod */}
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Our Bacolod Office
                    </h3>
                    <p className="text-gray-600">Heart of the City of Smiles</p>
                  </div>
                </div>

                <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200"
                    alt="Office Location"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-gray-700 font-medium">Main Office</p>
                      <p className="text-gray-600">
                        Lacson Street, Bacolod City
                      </p>
                      <p className="text-gray-600">
                        Negros Occidental, Philippines
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Airport Branch</p>
                      <p className="font-medium">Bacolod-Silay Airport</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Dumaguete Branch</p>
                      <p className="font-medium">Coming Soon 2024</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <Navigation className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">
                        Near SM City Bacolod • 5 mins from Bacolod Public Plaza
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs - Negros Specific */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Frequently Asked Questions
                    </h3>
                    <p className="text-gray-600">
                      About renting in Negros Occidental
                    </p>
                  </div>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section - Negros Islands */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-600 via-green-500 to-yellow-400 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            {/* Negros Island Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 mb-6">
                <Bike className="w-8 h-8" />
                <Shield className="w-8 h-8" />
                <Users className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Need Help Exploring Negros?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Call our Negros-based team for 24/7 support, travel tips, and
                emergency roadside assistance across the island.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl text-2xl"
                >
                  +63 34 456 7890
                </motion.div>
                <div className="text-center">
                  <p className="text-sm text-blue-100">Text/WhatsApp/Viber</p>
                  <p className="text-lg font-medium">+63 912 345 6789</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm text-blue-100">
                  📍 Serving all of Negros Island: Bacolod • Silay • Talisay •
                  Bago • Kabankalan • Dumaguete
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Map Section - Negros */}
      <div className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Navigation className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Our Negros Coverage
                </h3>
                <p className="text-gray-600">
                  We serve the entire Negros Island
                </p>
              </div>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-4">🗺️</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Negros Island Coverage Map
                </h4>
                <p className="text-gray-600 mb-4">
                  Bacolod • Silay • Talisay • Victorias • San Carlos • Dumaguete
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    "Free Bacolod Delivery",
                    "Airport Pickup",
                    "24/7 Negros Support",
                    "Island Ferry Services",
                  ].map((service, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
