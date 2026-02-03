import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = localStorage.getItem("user");
      setUser(JSON.parse(userData));
    }

    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const total = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(total);
    };

    updateCart();
    const onStorage = (e) => {
      if (e.key === "cart") updateCart();
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="bg-amber-50 border-b border-amber-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="w-10 h-10 rounded-md bg-amber-200 flex items-center justify-center text-amber-800 font-bold">
              OW
            </div>
            <span className="text-xl font-semibold text-amber-900">
              Online wardrobe
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 mx-8">
            <input
              type="text"
              placeholder="Search products..."
              aria-label="Search products"
              className="w-full px-4 py-2 border border-amber-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 bg-white text-amber-800 placeholder-amber-400"
            />
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/products"
              className={`text-sm ${location.pathname.startsWith("/products") ? "text-amber-800 font-semibold" : "text-amber-700 hover:text-amber-800"}`}
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-sm text-amber-700 hover:text-amber-800"
            >
              About
            </Link>

            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-sm text-amber-700 hover:text-amber-800"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="text-sm text-amber-700 hover:text-amber-800"
                >
                  Profile
                </Link>
              </>
            ) : null}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 px-3 py-1 bg-amber-600 text-white rounded-md hover:bg-amber-700"
              aria-label="View cart"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 21a1 1 0 100-2 1 1 0 000 2zM17 21a1 1 0 100-2 1 1 0 000 2z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="bg-amber-800 text-white px-3 py-1 rounded-md hover:bg-amber-900 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-amber-700 hover:text-amber-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-amber-700 text-white px-3 py-1 rounded-md hover:bg-amber-800 text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden text-amber-800">
              <span className="text-2xl">☰</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
