import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "../pages/Home.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import CreateProduct from "../pages/admin/CreateProduct.jsx";
import UserListing from "../pages/admin/UserListing.jsx";
import OrderTracking from "../pages/admin/OrderTracking.jsx";
import ProductPage from "../pages/ProductPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/products" element={<ProductPage />} />
      {/* {nested routes for admin} */}
      <Route path="admin" element={<Dashboard />}>
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="user-listing" element={<UserListing />} />
        <Route path="order-tracking" element={<OrderTracking />} />
      </Route>
    </Routes>
  );
}

export default App;
