import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  TrendingUp,
  Award,
  Heart,
  Clock,
  DollarSign,
  Globe,
  GraduationCap,
  ChevronRight,
  Send,
  CheckCircle,
} from "lucide-react";

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Competitive Salary",
      description: "Above industry average with regular reviews",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Career Growth",
      description: "Clear progression paths and promotions",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance",
      color: "from-red-500 to-rose-500",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Learning",
      description: "Training programs and certifications",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Flexible Work",
      description: "Remote and flexible hours options",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Paid Time Off",
      description: "Generous vacation and sick leave",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  const jobOpenings = [
    {
      id: 1,
      title: "Fleet Manager",
      department: "Operations",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "5+ years",
      description:
        "Manage our premium vehicle fleet, ensuring optimal maintenance and availability.",
    },
    {
      id: 2,
      title: "Customer Experience Lead",
      department: "Support",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description:
        "Lead our customer support team to deliver exceptional service experiences.",
    },
    {
      id: 3,
      title: "Software Engineer",
      department: "Technology",
      location: "New York, NY",
      type: "Full-time",
      experience: "2+ years",
      description:
        "Build and maintain our booking platform and mobile applications.",
    },
    {
      id: 4,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Los Angeles, CA",
      type: "Full-time",
      experience: "2+ years",
      description:
        "Develop and execute marketing campaigns to grow our brand presence.",
    },
    {
      id: 5,
      title: "Operations Analyst",
      department: "Operations",
      location: "Chicago, IL",
      type: "Full-time",
      experience: "1+ years",
      description:
        "Analyze operational data to improve efficiency and customer satisfaction.",
    },
    {
      id: 6,
      title: "Sales Representative",
      department: "Sales",
      location: "Miami, FL",
      type: "Full-time",
      experience: "2+ years",
      description:
        "Drive business growth through corporate partnerships and B2B sales.",
    },
  ];

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsApplying(true);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsApplying(false);
      setApplicationSubmitted(true);
      setSelectedJob(null);

      setTimeout(() => {
        setApplicationSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const cultureValues = [
    {
      title: "Customer First",
      description: "We put our customers at the center of everything we do.",
    },
    {
      title: "Innovation Driven",
      description: "We embrace change and seek better ways to serve.",
    },
    {
      title: "Team Collaboration",
      description: "We believe in the power of working together.",
    },
    {
      title: "Excellence",
      description: "We strive for the highest standards in all we do.",
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
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-blue-500/20 backdrop-blur-sm rounded-full"
            >
              <Briefcase className="w-5 h-5" />
              <span className="text-sm font-medium text-blue-300">
                Join Our Team
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
            >
              Build Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Career
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
            >
              Join a passionate team revolutionizing the premium car rental
              industry.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16 -mt-12">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-gray-900 mb-2">100+</div>
              <div className="text-gray-600">Team Members</div>
              <div className="text-sm text-gray-500 mt-1">
                Across 10 countries
              </div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-gray-900 mb-2">4.8★</div>
              <div className="text-gray-600">Employee Rating</div>
              <div className="text-sm text-gray-500 mt-1">On Glassdoor</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-gray-900 mb-2">30%</div>
              <div className="text-gray-600">Growth Rate</div>
              <div className="text-sm text-gray-500 mt-1">Year over year</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-6 py-3 bg-blue-100 rounded-full">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                Why Join Us
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Amazing <span className="text-blue-600">Benefits</span>
            </h2>
            <p className="text-lg text-gray-600">
              We invest in our people because they're our greatest asset.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${benefit.color} mb-6`}
                    >
                      <div className="text-white">{benefit.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                    <div
                      className={`mt-6 h-1 w-12 bg-gradient-to-r ${benefit.color} rounded-full transform group-hover:w-24 transition-all duration-300`}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Culture & Values */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-100 rounded-full">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">
                    Our Culture
                  </span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Work That <span className="text-blue-600">Matters</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  We foster a culture of innovation, collaboration, and
                  continuous learning. Every team member plays a crucial role in
                  our success story.
                </p>

                <div className="space-y-4">
                  {cultureValues.map((value, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {value.title}
                        </h4>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8">
                <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200"
                    alt="Team Culture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      50/50
                    </div>
                    <div className="text-sm text-gray-600">Gender Ratio</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-gray-900">15+</div>
                    <div className="text-sm text-gray-600">Nationalities</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Job Openings */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-6 py-3 bg-blue-100 rounded-full">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                Open Positions
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Current <span className="text-blue-600">Openings</span>
            </h2>
            <p className="text-lg text-gray-600">
              Find the perfect role to grow your career with us.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => handleApply(job)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                            {job.department}
                          </span>
                          <span>{job.location}</span>
                          <span>•</span>
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-gray-600 mb-6">{job.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Experience: {job.experience}
                      </span>
                      <span className="text-blue-600 font-medium">
                        Apply Now →
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {isApplying && selectedJob && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedJob.title}
                  </h3>
                  <p className="text-gray-600">
                    {selectedJob.department} • {selectedJob.location}
                  </p>
                </div>
                <button
                  onClick={() => setIsApplying(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitApplication} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (234) 567-890"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Cover Letter
                  </label>
                  <textarea
                    placeholder="Why are you interested in this position?"
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Resume/CV
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                    <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Drag & drop your resume here
                    </p>
                    <p className="text-sm text-gray-500">
                      or click to browse (PDF, DOC up to 5MB)
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Application</span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Success Message */}
      {applicationSubmitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 shadow-xl max-w-sm">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="font-semibold text-gray-900">
                  Application Submitted!
                </h4>
                <p className="text-sm text-gray-600">
                  We'll review your application and get back to you soon.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Don't See Your Perfect Role?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                We're always looking for talented people. Send us your resume
                and we'll keep you in mind for future opportunities.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl hover:shadow-xl transition-all"
              >
                Submit General Application
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Careers;
