import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Clock,
  BarChart3,
  Target,
  Shield,
  TrendingUp,
  Zap,
  Award,
  Star,
  ChevronRight,
  Lock,
  Globe,
  CheckCircle,
} from "lucide-react";

const Banner = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Full Insurance",
      description: "$1M comprehensive coverage on every rental",
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
      iconColor: "text-blue-400",
    },
    {
      icon: CreditCard,
      title: "Instant Payouts",
      description: "Direct bank transfers within 24 hours",
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      iconColor: "text-green-400",
    },
    {
      icon: Smartphone,
      title: "Smart Management",
      description: "Control everything from our mobile app",
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      iconColor: "text-purple-400",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Set custom availability blocks",
      color: "bg-gradient-to-br from-orange-500 to-amber-500",
      iconColor: "text-orange-400",
    },
  ];

  const earningCards = [
    {
      amount: "$800 - $1,500",
      label: "Monthly Average",
      sublabel: "Based on 7 days/month rental",
      icon: "💰",
      trend: "+15%",
      trendColor: "text-green-400",
      bgColor: "bg-gradient-to-br from-gray-800/50 to-gray-700/50",
    },
    {
      amount: "85%",
      label: "Occupancy Rate",
      sublabel: "Average bike utilization",
      icon: "📊",
      trend: "Peak",
      trendColor: "text-blue-400",
      bgColor: "bg-gradient-to-br from-gray-800/50 to-gray-700/50",
    },
    {
      amount: "$0",
      label: "Upfront Cost",
      sublabel: "List your bike for free",
      icon: "🎯",
      trend: "Free",
      trendColor: "text-purple-400",
      bgColor: "bg-gradient-to-br from-gray-800/50 to-gray-700/50",
    },
  ];

  const successStories = [
    {
      name: "Alex Chen",
      earnings: "$3,200",
      period: "last month",
      text: "Paid for my entire vacation!",
      bike: "Yamaha R6",
      avatarColor: "bg-gradient-to-br from-orange-500 to-red-500",
    },
    {
      name: "Sarah Miller",
      earnings: "$18,500",
      period: "this year",
      text: "Best passive income decision!",
      bike: "Harley Davidson",
      avatarColor: "bg-gradient-to-br from-blue-500 to-purple-500",
    },
    {
      name: "Mike Rodriguez",
      earnings: "$5,400",
      period: "Q3 earnings",
      text: "24/7 support saved my trip",
      bike: "BMW R1250GS",
      avatarColor: "bg-gradient-to-br from-green-500 to-teal-500",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "List in 5 Min",
      desc: "Upload photos & details",
      icon: "📱",
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      step: "2",
      title: "Set Your Price",
      desc: "Competitive daily rates",
      icon: "💰",
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
    {
      step: "3",
      title: "Get Booked",
      desc: "Verified riders book instantly",
      icon: "🚀",
      color: "bg-gradient-to-br from-orange-500 to-amber-500",
    },
    {
      step: "4",
      title: "Get Paid",
      desc: "Instant payout after each ride",
      icon: "💳",
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="relative px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-gray-900 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Gradient Accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
            <span className="text-sm font-medium text-orange-300 tracking-wide">
              PREMIUM PARTNER PROGRAM
            </span>
            <Award className="w-4 h-4 text-orange-400" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="block">Turn Your Motorcycle</span>
            <span className="block bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Into Passive Income
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Your parked bike could earn you{" "}
            <span className="font-semibold text-orange-300">
              $2,500+ monthly
            </span>
            . Premium protection, instant payouts, zero hassle management.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
          {/* Left Column - Value Proposition */}
          <div className="space-y-10">
            {/* Earnings Potential */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-5"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                  <BarChart3 className="w-5 h-5 text-orange-400" />
                  Real Earnings Potential
                </h2>
                <span className="text-xs text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                  500+ Owners
                </span>
              </div>

              <div className="grid gap-3">
                {earningCards.map((card, index) => (
                  <div
                    key={index}
                    className={`${card.bgColor} backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 transition-all duration-300 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-2xl">{card.icon}</span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full bg-gray-800/50 ${card.trendColor}`}
                      >
                        {card.trend}
                      </span>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {card.amount}
                    </div>
                    <div className="font-semibold text-white mb-1">
                      {card.label}
                    </div>
                    <div className="text-sm text-gray-400">{card.sublabel}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Process Steps */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-5"
            >
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Target className="w-5 h-5 text-blue-400" />
                Simple 4-Step Process
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {processSteps.map((step, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center hover:border-gray-600/50 transition-colors"
                  >
                    <div className="text-xl mb-2">{step.icon}</div>
                    <div className="text-xs font-mono text-orange-400 mb-1">
                      STEP {step.step}
                    </div>
                    <div className="font-bold text-white text-sm mb-1">
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-400">{step.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Features & Success Stories */}
          <div className="space-y-10">
            {/* Premium Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                  <Shield className="w-5 h-5 text-green-400" />
                  Premium Protection Suite
                </h3>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">4.9/5</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 hover:border-gray-600/50 transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`p-2.5 rounded-lg ${feature.color}`}>
                          <Icon className={`w-5 h-5 ${feature.iconColor}`} />
                        </div>
                        <h4 className="text-lg font-semibold text-white">
                          {feature.title}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Success Stories */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Owner Success Stories
                </h3>
                <span className="text-xs text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                  Live Updates
                </span>
              </div>

              <div className="space-y-3">
                {successStories.map((story, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${story.avatarColor} flex items-center justify-center text-white font-bold text-sm`}
                      >
                        {story.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-white">
                              {story.name}
                            </h4>
                            <p className="text-xs text-gray-400">
                              {story.bike}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-400">
                              {story.earnings}
                            </div>
                            <div className="text-xs text-gray-400">
                              {story.period}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 italic">
                          "{story.text}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 md:p-10"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to Transform Your Bike?
              </h3>
              <p className="text-gray-300 mb-6">
                Join 750+ owners earning premium passive income. Everything you
                need to succeed, in one platform.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  {
                    icon: <Lock className="w-4 h-4" />,
                    text: "Secure Platform",
                  },
                  {
                    icon: <Globe className="w-4 h-4" />,
                    text: "Global Reach",
                  },
                  {
                    icon: <CheckCircle className="w-4 h-4" />,
                    text: "24/7 Support",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-300 bg-gray-800/50 px-3 py-1.5 rounded-lg"
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button className="group relative w-full overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-center justify-center gap-3 px-6 py-4 text-white font-semibold">
                  <Zap className="w-5 h-5" />
                  <span>Start Earning Today - Free</span>
                  <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700/50 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <Smartphone className="w-4 h-4" />
                <span>Calculate Your Potential Earnings</span>
              </button>

              <p className="text-center text-xs text-gray-400 pt-2">
                No commitment. Cancel anytime. Full insurance from day one.
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-gray-700/50">
            {[
              { value: "98%", label: "Owner Retention" },
              { value: "4.9★", label: "Platform Rating" },
              { value: "$2.8M+", label: "Paid Out" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl md:text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
