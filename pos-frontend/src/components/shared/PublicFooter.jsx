import React from "react";
import { Link } from "react-router-dom";

const PublicFooter = () => {
  return (
    <footer className="bg-surface-container-lowest w-full py-16 border-t-4 border-primary-container mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto">
        <div className="flex flex-col items-start gap-4">
          <Link to="/" className="font-display-xl text-3xl font-black text-primary-container italic uppercase tracking-tighter mb-4">FITBITE CAFE</Link>
          <p className="font-body-md text-sm text-on-surface-variant max-w-xs">Fueling athletes, hustlers, and late-night grinders with brutal efficiency.</p>
        </div>
        
        <div className="flex flex-col space-y-4">
          <h4 className="font-label-md text-sm text-primary uppercase font-bold">Connect</h4>
          <a className="font-label-md text-sm text-on-surface-variant hover:text-primary transition-colors inline-block w-max" href="#">Instagram</a>
          <a className="font-label-md text-sm text-on-surface-variant hover:text-primary transition-colors inline-block w-max" href="#">Facebook</a>
        </div>
        
        <div className="flex flex-col space-y-4">
          <h4 className="font-label-md text-sm text-primary uppercase font-bold">Info</h4>
          <Link to="/contact" className="font-label-md text-sm text-on-surface-variant hover:text-primary transition-colors inline-block w-max">Location</Link>
          <Link to="/" className="font-label-md text-sm text-on-surface-variant hover:text-primary transition-colors inline-block w-max">Privacy Policy</Link>
        </div>
      </div>
      <div className="mt-16 px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto text-center border-t border-surface-container pt-8">
        <p className="font-label-md text-sm text-on-surface-variant">© 2024 FITBITE CAFE. FUEL YOUR HUSTLE.</p>
      </div>
    </footer>
  );
};

export default PublicFooter;
