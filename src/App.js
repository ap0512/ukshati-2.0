import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DeviceProtectedRoute } from './Components/Utils/ProtectedRoute.js';
import { ValveProvider } from './Components/Utils/ValveContext.js';
import ProductRouter from './Components/Utils/ProductRouter.jsx';
// Lazy-loaded components
const Home = React.lazy(() => import('./Components/Pages/Home'));
const About = React.lazy(() => import('./Components/Pages/About'));
const Products = React.lazy(() => import('./Components/Pages/Products'));
const Contact = React.lazy(() => import('./Components/Pages/Contact'));
const Blog = React.lazy(() => import('./Components/Pages/Blog'));
const Login = React.lazy(() => import('./Components/Pages/Login'));
const Uno = React.lazy(() => import('./Components/Product_Pages/Uno'));
// const Hexa = React.lazy(() => import('./Components/Product_Pages/Hexa'));
const Octa = React.lazy(() => import('./Components/Product_Pages/Octa'));
const Quadra = React.lazy(() => import('./Components/Product_Pages/Quadra'));

/**
 * The main app component
 * @returns {JSX.Element}
 */
function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Products />}>
            <Route
              path=":id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ProductRouter />
                </Suspense>
              }
            />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Uno" element={<ValveProvider>
            <DeviceProtectedRoute requiredDevice="UNO">
              <Uno />
              </DeviceProtectedRoute>
              </ValveProvider>} />
          <Route path="/Octa" element={<DeviceProtectedRoute requiredDevice="OCTA"><Octa /></DeviceProtectedRoute>} />
          <Route path="/Quadra" element={<DeviceProtectedRoute requiredDevice="QUADRA"><Quadra /></DeviceProtectedRoute>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
