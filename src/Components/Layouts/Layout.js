import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  const location = useLocation();

  // Define page titles based on routes
  const pageTitles = {
    "/": "Home - Ukshati",
    "/about": "About Us",
    "/product" :" Our Products",
    "/contact": "Contact Us",
    "/blog": "Our Blog",
  };

  const title = pageTitles[location.pathname] || "Ukshati";

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="Page description" />
        <meta name="keywords" content="default, keywords" />
        <meta name="author" content="Author Name" />
        <title>{title}</title>
      </Helmet>

      <Navigation />

      <main style={{ minHeight: "80vh", paddingTop :"70px"}} className="bg-gray-100">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;