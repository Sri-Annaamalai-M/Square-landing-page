import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import Button from "./Button2.jsx";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const linkClasses = ({ isActive }) =>
    `text-sm md:text-base font-bold font-manrope cursor-pointer transition-colors duration-300
     ${isActive ? "text-blue-600" : "text-global-4 hover:text-blue-600"}`;

  // Function to handle navigation link clicks
  const handleNavClick = () => {
    setMenuOpen(false);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to handle contact button click
  const handleContactClick = () => {
    const ctaSection = document.getElementById('cta-section');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <header className="w-full bg-white p-4 fixed top-0 left-0 z-100 backdrop-blur-md">
      <div className="w-[90%] max-w-[1440px] mx-auto relative flex items-center justify-between">
        {/* Logo - left corner */}
        <div className="w-[60px] sm:w-[80px] md:w-[96px]">
          <img
            src="/images/img_square_logo_black.png"
            alt="SNS Square Logo"
            className="w-[60px] h-[42px] sm:w-[80px] sm:h-[55px] md:w-[96px] md:h-[66px]"
          />
        </div>
        
        {/* Nav - center */}
        <nav className="hidden lg:flex flex-row items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          <NavLink to="/" className={linkClasses} onClick={handleNavClick}>
            Home
          </NavLink>
          <NavLink to="/agent-workbench" className={linkClasses} onClick={handleNavClick}> 
            Agent Workbench
          </NavLink>
          <NavLink to="/usecase" className={linkClasses} onClick={handleNavClick}>
            Use Case
          </NavLink>
          <NavLink to="/life-at-sns" className={linkClasses} onClick={handleNavClick}>
            Life at SNS Square
          </NavLink>
        </nav>
        
        {/* Contact Us - right corner */}
        <div className="hidden lg:flex">
         <Button
          variant="secondary"
          size="small"
          className="mt-4 rounded-[18px] px-6 py-1 text-sm font-bold bg-black text-white hover:bg-blue-600 transition-colors duration-300"
          onClick={handleContactClick}
        >
          Contact us
        </Button>
        </div>
        
        {/* Hamburger Menu Icon (Mobile only) */}
        <button
          className="block lg:hidden p-2 ml-auto"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className="block w-full h-0.5 bg-black mb-1"></span>
            <span className="block w-full h-0.5 bg-black mb-1"></span>
            <span className="block w-full h-0.5 bg-black"></span>
          </div>
        </button>
      </div>
      
      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-4 bg-global-7 rounded-lg p-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-4">
            <NavLink to="/" className={linkClasses} onClick={handleNavClick}>
              Home
            </NavLink>
            <NavLink 
              to="/agent-workbench" 
              className={linkClasses} 
              onClick={handleNavClick}
            >
              Agent workbench
            </NavLink>
            <NavLink to="/usecase" className={linkClasses} onClick={handleNavClick}>
              Use Case
            </NavLink>
            <NavLink to="/life-at-sns" className={linkClasses} onClick={handleNavClick}>
              Life at SNS Square
            </NavLink>
          </nav>
          <Button
            variant="secondary"
            size="small"
            className="mt-4 rounded-[18px] px-6 py-1 text-sm font-bold bg-black text-white hover:bg-blue-600 transition-colors duration-300"
            onClick={handleContactClick}
          >
            Contact us
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;