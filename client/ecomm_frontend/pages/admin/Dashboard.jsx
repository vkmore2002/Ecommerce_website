import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserDetails } from "../../api/apis.js";

//check if user is logged in and is admin or not

const Dashboard = () => {
  //navigate to login if not logged in
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUSerDetials = async () => {
      try {
        const token = localStorage.getItem("token"); //get token from THe Local Storage
        const user = await getUserDetails(token);
        if (user.role !== "admin") {
          navigate("/"); //if the user is not admin navigate to home
        }
        console.log("User Details:", user);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };
    fetchUSerDetials();
  }, []);
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#FFF8DE" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside
          className="md:col-span-1 bg-white rounded-xl shadow p-5"
          style={{ borderLeft: "6px solid #FFF2C6" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2
                className="text-xl font-semibold"
                style={{ color: "#8CA9FF" }}
              >
                Admin
              </h2>
              <p className="text-sm" style={{ color: "#AAC4F5" }}>
                Dashboard
              </p>
            </div>
          </div>

          <nav className="mt-6">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin/create-product"
                  className="block px-3 py-2 rounded transition"
                  style={{ color: "#8CA9FF" }}
                >
                  Create Product
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/user-listing"
                  className="block px-3 py-2 rounded transition"
                  style={{ color: "#8CA9FF" }}
                >
                  User Listing
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/order-tracking"
                  className="block px-3 py-2 rounded transition"
                  style={{ color: "#8CA9FF" }}
                >
                  Order Tracking
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="md:col-span-3">
          <header className="mb-4">
            <h1 className="text-2xl font-bold" style={{ color: "#8CA9FF" }}>
              Dashboard
            </h1>
            <p className="text-sm" style={{ color: "#AAC4F5" }}>
              Overview of the store
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div
              className="bg-white rounded-xl p-4 shadow"
              style={{ border: "4px solid #FFF2C6" }}
            >
              <div
                className="text-2xl font-semibold"
                style={{ color: "#8CA9FF" }}
              >
                128
              </div>
              <div className="text-sm mt-1" style={{ color: "#AAC4F5" }}>
                Products
              </div>
            </div>

            <div
              className="bg-white rounded-xl p-4 shadow"
              style={{ border: "4px solid #FFF2C6" }}
            >
              <div
                className="text-2xl font-semibold"
                style={{ color: "#8CA9FF" }}
              >
                54
              </div>
              <div className="text-sm mt-1" style={{ color: "#AAC4F5" }}>
                Users
              </div>
            </div>

            <div
              className="bg-white rounded-xl p-4 shadow"
              style={{ border: "4px solid #FFF2C6" }}
            >
              <div
                className="text-2xl font-semibold"
                style={{ color: "#8CA9FF" }}
              >
                21
              </div>
              <div className="text-sm mt-1" style={{ color: "#AAC4F5" }}>
                Orders
              </div>
            </div>
          </div>

          <section
            className="bg-white rounded-xl p-6 shadow"
            style={{ border: "4px solid #FFF2C6" }}
          >
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
