// Import necessary dependencies

import React , { useEffect} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FaFacebook, FaTwitter, FaLinkedin, FaYoutube, 
  FaAndroid, FaInstagram, FaMapMarker, FaEnvelope, FaPhone 
} from 'react-icons/fa';

// Define the Footer component
const Footer = () => {

  const getyear = new Date().getFullYear()
  
  const location = useLocation();

  // Handle scrolling after navigation
  useEffect(() => {
    // Check if we have a hash in the URL
    if (location.hash === '#services') {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const element = document.getElementById('services');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
          window.scrollBy(0, -50); // Adjust as needed
        }, 500);
      }
      }, 100);
    }
  }, [location]); // Re-run when location changes

  return (
    <footer className="bg-gray-900 text-white text-sm">
      
      {/* ====== Social Media Section ====== */}
      <section className="flex flex-wrap justify-between items-center px-6 py-4 border-b border-gray-700">
        {/* Social Media Text */}
        <div className="text-center lg:text-left">
          <span>Connect with us on social networks:</span>
        </div>
        
        {/* Social Media Icons */}
        <div className="flex justify-center mt-2 lg:mt-0 space-x-4">
          <a href="https://www.facebook.com/people/Ukshati/100071082044345/#" target="_blank" rel="noopener noreferrer" className="text-gray-400   hover:text-white"><FaFacebook className="text-lg" />
          </a>
          <a href="https://x.com/UkshatiTech" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaTwitter className="text-lg" />
          </a>
          <a href="https://www.linkedin.com/company/ukshati-technologies/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaLinkedin className="text-lg" />
          </a>
          <a href="https://www.instagram.com/ukshati/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaInstagram className="text-lg" />
          </a>
          <a href="https://www.instagram.com/ukshati/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaAndroid className="text-lg" />
          </a>
          <a href="https://www.youtube.com/@Ukshati" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaYoutube className="text-lg" />
          </a>
        </div>
      </section>

      {/* ====== Main Footer Content Section ====== */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* ==== About Us Section ==== */}
          <div>
            <h6 className="text-lg font-semibold text-green-400 mb-2">Company Name</h6>
            <p className="text-gray-300">
              Ukshati (उक्षति sprinkle water) System is a watering automation service provider. 
              We automate the process of watering for various setups, from large gardens to small balconies.
            </p>
          </div>

          {/* ==== Quick Links Section ==== */}
          <div>
            <h6 className="text-lg font-semibold text-green-400 mb-2">Quick Links</h6>
            <ul className="space-y-2">
              <li><NavLink to="/" end className="text-gray-300 hover:text-white">Home</NavLink></li>
              
              <li><NavLink to="/about" className="text-gray-300 hover:text-white">About</NavLink></li>
              <li>
                <NavLink 
                  to="/#services" 
                  className={({ isActive }) =>
                    !isActive && window.location.hash !== "#services"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-300 hover:text-white"
                  }
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      // If we're already on home page, just scroll
                      e.preventDefault();
                      const element = document.getElementById('services');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      
                      setTimeout(() => {
                        window.scrollBy(0, -50); // Adjust as needed
                      }, 500);
                    }
                    }
                    // If we're on another page, let the normal navigation happen
                    // The useEffect above will handle the scrolling after navigation
                  }}
                >
                  Services
              </NavLink>
              </li>
              <li><NavLink to="/product" className="text-gray-300 hover:text-white">Products</NavLink></li>
              <li><NavLink to="/contact" className="text-gray-300 hover:text-white">Contact</NavLink></li>
              <li><NavLink to="/blog" className="text-gray-300 hover:text-white">Blog</NavLink></li>
            </ul>
            
          </div>

          {/* ==== Contact Information Section ==== */}
          <div>
            <h6 className="text-lg font-semibold text-red-300 mb-2">Contact Us</h6>
            <p className="flex items-center text-gray-300">
              <FaMapMarker className="mr-2" /> Ukshati Technologies Pvt Ltd, Pramod Towers, Mangaluru, Karnataka 575002
            </p>
            <p className="flex items-center text-gray-300 mt-2">
              <FaEnvelope className="mr-2" /> ukshati365@gmail.com
            </p>
            <p className="flex items-center text-gray-300 mt-2">
              <FaPhone className="mr-2" /> +91 8861567365
            </p>
          </div>
        </div>
      </section>

      {/* ====== Copyright Section ====== */}
      <div className="text-center py-3 bg-gray-800">
        <span className="text-gray-400">

          © {getyear} <span className="text-green-400">Ukshati Technologies</span>. All rights reserved.

        </span>
      </div>

    </footer>
  );
};

export default Footer;
