import React, { useRef } from "react";
import Hero from "../component/Homepage/Hero";
import Service from "../component/Service";
import Footer from "../component/layout/Footer";
import ScrollToTopButton from "../component/ScrollToTopButton ";
import "./Homepage.css";
import Nav from "../component/layout/Nav";
import Faqs from "../component/Homepage/Faqs";
import Contact from "../component/Homepage/Contact";
import { Helmet } from "react-helmet";

const Homepage = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section
      ? section.scrollIntoView({ behavior: "smooth" })
      : console.log(`There is no section named '${id}'`);
  };

  return (
    <div>
      <Helmet>
        <title>NoByll - Homepage</title>
      </Helmet>
      <Nav scrollToSection={scrollToSection} />
      <div>
        <Hero />
      </div>
      {/* <div ref={featuresRef}><Features /></div> */}
      {/* <div ref={makeMoneyRef}><MakeMoney /></div> */}
      {/* <div ref={aboutUsRef}><Aboutus /></div> */}
      <div id="services">
        <Service />
      </div>
      <div id="faqs">
        <Faqs />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Homepage;
