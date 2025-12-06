import React from "react";
import Hero from "../components/Hero";
import FeaturedSection from "../components/FeaturedSection";
import Banner from "../components/Banner";
import Testimonial from "../components/Testimonial";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div className="bg-gray-50">
      <Hero />
      <FeaturedSection />
      <Banner />
      <Testimonial />
      <NewsLetter />
    </div>
  );
};

export default Home;
