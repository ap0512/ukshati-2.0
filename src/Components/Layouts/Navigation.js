// Import necessary dependencies
import React, { useState, useEffect } from 'react'; // Import React, useState, and useEffect hooks
import { NavLink, useLocation } from 'react-router-dom'; // Import NavLink and useLocation from React Router
import { FaUserCircle } from 'react-icons/fa'; // Import user icon from react-icons library
import "../Styles/Navigation.css"; // Import external CSS for styling

// Define the Navigation component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu toggle
  const location = useLocation(); // Hook to get the current location

  // Scroll to the top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [location]); // Run this effect whenever the location changes

  // Array of navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/product" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    // Header container with fixed position and shadow styling
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      {/* Navigation bar */}
      <nav className="container mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo Section */}
        <div className="flex items-center">
          <NavLink
            to="/"
            aria-label="Home"
            className={({ isActive }) =>
              isActive ? "focus:outline-none pointer-events-none" : "focus:outline-none"
            }
            style={{ textDecoration: 'none' }}
          >
            <img
              src="https://www.gogreendrip.com/GoGreen/GoGreen/images/logowithleaf.png"
              alt="Logo"
              className="w-36 h-auto"
            />
          </NavLink>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className="text-gray-700 text-lg font-medium hover:text-green-600"
              activeClassName="text-blue-600 border-bottom-2 border-blue-600"
            >
              {name}
            </NavLink>
          ))}
        </div>

        {/* Login Button (Visible on Desktop) */}
        <div className="hidden md:flex items-center space-x-2">
          <NavLink
            to="/login"
            className="flex items-center space-x-1 text-gray-700 text-lg font-medium hover:text-green-600"
          >
            <FaUserCircle className="text-2xl" />
            <span>Login</span>
          </NavLink>
        </div>

        {/* Mobile Menu Button (Hamburger Icon) */}
        <div className="md:hidden">
          <button
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle navigation"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col space-y-4 py-4 px-6">
            {navLinks.map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                className="text-gray-700 text-lg font-medium hover:text-green-600"
                activeClassName="text-green-600"
                onClick={() => setIsOpen(false)}
              >
                {name}
              </NavLink>
            ))}
            
            {/* Login Button (Visible on Mobile) */}
            <NavLink
              to="/login"
              className="flex items-center space-x-1 text-gray-700 text-lg font-medium hover:text-green-600"
              onClick={() => setIsOpen(false)}
            >
              <FaUserCircle className="text-2xl" />
              <span>Login</span>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;