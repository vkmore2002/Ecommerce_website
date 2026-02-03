import React from "react";
import { getAllProducts } from "../api/apis.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts(localStorage.getItem("token"));
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product, e) => {
    // prevent the Link navigation when clicking Add
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find(
      (item) => item._id === product._id || item.id === product.id,
    );

    if (existing) {
      existing.quantity = (existing.quantity || 0) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Products</h1>
            <p className="mt-1 text-sm text-slate-500">
              Start filling your cart with amazing products!
            </p>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-slate-500">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-400 rounded-full animate-spin" />
              <span className="text-sm">Loading products...</span>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-lg bg-rose-50 border border-rose-100 p-4 text-rose-700">
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center text-slate-500">
            No products found.
          </div>
        ) : (
          <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const id = product._id || product.id || Math.random().toString();
              const image =
                product.image && typeof product.image === "string"
                  ? product.image
                  : Array.isArray(product.image)
                    ? product.image[0]
                    : null;

              return (
                <Link
                  to={`/product/${id}`}
                  key={id}
                  className="no-underline text-inherit"
                  aria-label={`View details for ${product.name}`}
                >
                  <article className="relative bg-white rounded-2xl p-4 shadow-sm group hover:shadow-lg transition-transform duration-200 border border-transparent hover:border-slate-100 transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer overflow-hidden">
                    {/* Discount badge */}
                    {product.discount && (
                      <div className="absolute top-3 right-3 bg-rose-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
                        {product.discount}% OFF
                      </div>
                    )}

                    <div className="rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center h-48 mb-4 relative">
                      {image ? (
                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                        <img
                          src={image}
                          alt={product.name || "Product image"}
                          className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="text-slate-400 text-sm">No image</div>
                      )}

                      {/* Overlay View indicator */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-black/30 to-transparent">
                        <span className="bg-white/10 text-white backdrop-blur-sm px-4 py-2 rounded-md text-sm">
                          View
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col h-full">
                      <h3 className="text-lg font-medium text-slate-800 truncate">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      <div className="mt-3 flex items-center gap-3 text-sm">
                        <div className="flex items-center text-yellow-500 font-semibold">
                          <span className="mr-1">★</span>
                          <span>
                            {product.rating ? product.rating.toFixed(1) : "—"}
                          </span>
                        </div>
                        <div className="text-slate-400">•</div>
                        <div className="text-slate-500">
                          {product.reviews?.length || 0} reviews
                        </div>

                        <div
                          className={`ml-auto text-xs font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {product.stock > 0
                            ? `In stock (${product.stock})`
                            : "Out of stock"}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-4">
                        <div className="flex items-baseline gap-3">
                          <span className="text-xl font-semibold text-emerald-600">
                            ₹{product.price}
                          </span>
                        </div>

                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-sm transition"
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <span className="text-sm">Add</span>
                        </button>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
