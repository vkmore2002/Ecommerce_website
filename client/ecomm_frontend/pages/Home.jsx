import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { getUserDetails } from "../api/apis.js";

const Home = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuthAndRole = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const user = await getUserDetails(token);
        if (user?.role === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };
    checkAuthAndRole();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        <main className="max-w-6xl mx-auto px-4 py-16">
          <section className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
                Style That Speaks. Essentials That Last.
              </h1>
              <p className="mt-4 text-lg text-slate-600 max-w-xl">
                Explore modern fashion, statement watches, and everyday sneakers
                — built for comfort, confidence, and daily wear.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  Shop Products
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-md bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:shadow focus:outline-none focus:ring-2 focus:ring-slate-200"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-semibold text-slate-800">
                    Curated Selection
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Only the essentials — carefully chosen for balance.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-semibold text-slate-800">
                    Free Shipping
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Fast, reliable delivery on selected orders.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-semibold text-slate-800">
                    Secure Payments
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Safe, encrypted checkout experience.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
