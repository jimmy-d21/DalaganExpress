import React from "react";
import Hero from "../components/Hero";
import FeaturedSection from "../components/FeaturedSection";
import Banner from "../components/Banner";
import Testimonial from "../components/Testimonial";
import NewsLetter from "../components/NewsLetter";
import FeaturedMotorSection from "../components/FeaturedMotorSection";

const Home = () => {
  return (
    <div className="bg-gray-50">
      <Hero />
      <FeaturedMotorSection />
      <Banner />
      <Testimonial />
      <NewsLetter />
    </div>
  );
};

export default Home;
