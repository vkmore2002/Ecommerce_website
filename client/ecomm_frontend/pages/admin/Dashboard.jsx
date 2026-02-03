import React from "react";
import "./Dashboard.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserDetails, getAllProducts, getAllUsers } from "../../api/apis.js";

// Admin dashboard — minimal, calm UI without Tailwind
const Dashboard = () => {
  const navigate = useNavigate();
  const [productsCount, setProductsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0); // placeholder — implement orders API later

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const user = await getUserDetails(token);
        if (!user) {
          navigate("/login");
          return;
        }
        if (user.role !== "admin") {
          navigate("/");
          return;
        }

        // fetch counts after admin verification
        try {
          const products = await getAllProducts(token);
          setProductsCount(Array.isArray(products) ? products.length : 0);
        } catch (err) {
          console.error("Failed to fetch products count:", err);
          setProductsCount(0);
        }

        try {
          const users = await getAllUsers(token);
          setUsersCount(Array.isArray(users) ? users.length : 0);
        } catch (err) {
          console.error("Failed to fetch users count:", err);
          setUsersCount(0);
        }

        // ordersCount remains 0 until orders API is implemented

        console.log("User Details:", user);
      } catch (err) {
        console.error("Error fetching user details:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          navigate("/");
        }
      }
    };
    fetchUserDetails();
  }, [navigate]);

  return (
    <div className="dashboard-root">
      <div className="container">
        <aside className="sidebar">
          <div className="brand">
            <h2>Admin</h2>
          </div>

          <nav className="nav">
            <ul>
              <li>
                <Link to="/admin/create-product" className="nav-link">
                  Create Product
                </Link>
              </li>
              <li>
                <Link to="/admin/user-listing" className="nav-link">
                  User Listing
                </Link>
              </li>
              <li>
                <Link to="/admin/order-tracking" className="nav-link">
                  Order Tracking
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="main">
          <header className="main-header">
            <h1>Dashboard</h1>
            <p>Overview of the store</p>
          </header>

          <div className="stats">
            <div className="stat card">
              <div className="stat-value">{productsCount}</div>
              <div className="stat-label">Products</div>
            </div>

            <div className="stat card">
              <div className="stat-value">{usersCount}</div>
              <div className="stat-label">Users</div>
            </div>

            <div className="stat card">
              <div className="stat-value">{ordersCount}</div>
              <div className="stat-label">Orders</div>
            </div>
          </div>

          <section className="panel card">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
