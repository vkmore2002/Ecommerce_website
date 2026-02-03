import React from "react";
import { getAllProducts } from "../api/apis.js";
import { useEffect, useState } from "react";

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
                <article
                  key={id}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border border-transparent hover:border-slate-100"
                >
                  <div className="rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center h-48 mb-4">
                    {image ? (
                      // eslint-disable-next-line jsx-a11y/img-redundant-alt
                      <img
                        src={image}
                        alt={product.name || "Product image"}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="text-slate-400 text-sm">No image</div>
                    )}
                  </div>

                  <div className="flex flex-col h-full">
                    <h3 className="text-lg font-medium text-slate-800 truncate">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-slate-500 mt-1 truncate">
                        {product.description}
                      </p>
                    )}

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div className="flex items-baseline gap-3">
                        <span className="text-xl font-semibold text-emerald-600">
                          ₹{product.price}
                        </span>
                        {product.discount && (
                          <span className="text-sm text-slate-400">
                            {product.discount}% off
                          </span>
                        )}
                      </div>

                      <button className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-sm transition">
                        Add
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
