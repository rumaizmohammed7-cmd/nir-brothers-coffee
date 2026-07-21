import React, { useEffect } from 'react';
import Hero from '../sections/Hero';
import BestSellers from '../sections/BestSellers';
import FarmJourney from '../sections/FarmJourney';
import AboutSection from '../sections/AboutSection';
import ProcessSection from '../sections/ProcessSection';
import WhyChooseUs from '../sections/WhyChooseUs';
import Testimonials from '../sections/Testimonials';
import InstagramGallery from '../sections/InstagramGallery';
import Newsletter from '../sections/Newsletter';
import SideNavigator from '../components/SideNavigator';

const Home = () => {
  useEffect(() => {
    // Set page title for SEO
    document.title = "NIR Brothers Coffee | Luxury Farm-Fresh Coffee Roasters";
  }, []);

  return (
    <div className="w-full relative">
      {/* Side Scroll Navigator */}
      <SideNavigator />

      {/* 1. Hero Slider Section */}
      <div id="hero">
        <Hero />
      </div>

      {/* 2. Best Sellers Slider */}
      <div id="bestsellers">
        <BestSellers />
      </div>

      {/* 3. Sourcing & Farm Journey */}
      <div id="journey">
        <FarmJourney />
      </div>

      {/* 4. About Us Snippet */}
      <div id="about">
        <AboutSection />
      </div>

      {/* 5. Process Steps */}
      <div id="process">
        <ProcessSection />
      </div>

      {/* 6. Why Choose Us */}
      <div id="whyus">
        <WhyChooseUs />
      </div>

      {/* 7. Testimonials */}
      <div id="testimonials">
        <Testimonials />
      </div>

      {/* 8. Instagram Gallery */}
      <div id="gallery">
        <InstagramGallery />
      </div>

      {/* 9. Newsletter Sign-up */}
      <div id="newsletter">
        <Newsletter />
      </div>
    </div>
  );
};

export default Home;
