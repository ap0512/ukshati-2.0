
import React, { useEffect } from "react";
import Layout from '../Layouts/Layout';
import SystemCards from '../Layouts/SystemCards';
import { useNavigate } from "react-router-dom";

const Products = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem("isAuthenticated");
  //   if (!isAuthenticated) {
  //     // Save attempted route and redirect to login
  //     localStorage.setItem("redirectAfterLogin", "/products");
  //     navigate("/login");
  //   }
  // }, [navigate]);

  return (
    <>
    <Layout>
      <SystemCards/>
    </Layout>
    
    
    </>
  );
};

export default Products;

