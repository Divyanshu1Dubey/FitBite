import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const PublicNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // If we are on the menu page, the action button should be 'Employee Login' to /auth
  // Otherwise, it's 'Order Now' to /menu
  const isMenuPage = location.pathname === "/menu";
  const actionText = isMenuPage ? "Employee Login" : "Order Now";
  const actionLink = isMenuPage ? "/auth" : "/menu";

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-outline-variant">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max-width mx-auto">
          <Link to="/" className="font-display-xl text-2xl font-black text-primary-container italic uppercase tracking-tighter">
            FITBITE CAFE
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-label-md text-sm font-medium hover:text-primary-container transition-colors py-2 ${location.pathname === '/' ? 'text-primary-container font-bold border-b-2 border-primary-container pb-1' : 'text-on-surface'}`}>Home</Link>
            <Link to="/menu" className={`font-label-md text-sm font-medium hover:text-primary-container transition-colors py-2 ${location.pathname === '/menu' ? 'text-primary-container font-bold border-b-2 border-primary-container pb-1' : 'text-on-surface'}`}>Menu</Link>
            <Link to="/contact" className={`font-label-md text-sm font-medium hover:text-primary-container transition-colors py-2 ${location.pathname === '/contact' ? 'text-primary-container font-bold border-b-2 border-primary-container pb-1' : 'text-on-surface'}`}>Contact</Link>
          </div>
          
          {/* Desktop Action Button */}
          <Link to={actionLink} className="bg-primary-container text-black font-label-md text-sm uppercase font-black py-2 px-6 rounded-none transition-all duration-200 hard-shadow md:flex hidden items-center justify-center hover:-translate-y-1">
            {actionText}
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} className="md:hidden text-primary-container p-2 focus:outline-none">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-24 px-6 flex flex-col gap-6 md:hidden">
          <Link to="/" onClick={toggleMenu} className="font-display-xl text-3xl font-black text-on-surface uppercase tracking-tighter">Home</Link>
          <Link to="/menu" onClick={toggleMenu} className="font-display-xl text-3xl font-black text-on-surface uppercase tracking-tighter">Menu</Link>
          <Link to="/contact" onClick={toggleMenu} className="font-display-xl text-3xl font-black text-on-surface uppercase tracking-tighter">Contact</Link>
          <div className="h-px bg-surface-container-highest w-full my-4"></div>
          <Link to={actionLink} onClick={toggleMenu} className="bg-primary-container text-black font-display-xl text-2xl uppercase font-black py-4 px-6 rounded-none text-center">
            {actionText}
          </Link>
        </div>
      )}
    </>
  );
};

export default PublicNavbar;
