import React from 'react'
import Layout from '../Layouts/Layout'
import SystemCards from '../Layouts/SystemCards'
import { Outlet, useLocation } from 'react-router-dom'



const Products = () => {
const currentlocation = useLocation();

const isittrue = currentlocation.pathname === '/product';
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
      <div>
        <p>the </p>
      </div>
      { isittrue && <SystemCards/> }
      <Outlet/>
    </Layout>
    </>
  )
}

export default Products;
