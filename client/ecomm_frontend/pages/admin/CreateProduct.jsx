import React from "react";
import { useState } from "react";
import { createProduct } from "../../api/apis.js";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    // Logic to handle product creation can be added here
    const productData = {
      name,
      description,
      price,
      stock,
      category,
      image,
    };

    const data = await createProduct(
      productData,
      localStorage.getItem("token"),
    );
    if (data) {
      alert("Product created successfully");
    } else {
      alert("Failed to create product");
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#FFF8DE" }}
    >
      <section
        className="w-full max-w-2xl rounded-xl shadow-lg p-6"
        style={{ backgroundColor: "#FFFFFF", border: "4px solid #FFF2C6" }}
      >
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ color: "#8CA9FF" }}
        >
          Create Product
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2">
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#AAC4F5" }}
              htmlFor="productName"
            >
              Product name
            </label>
            <input
              className="w-full p-2 rounded border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
              type="text"
              id="productName"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#AAC4F5" }}
              htmlFor="productPrice"
            >
              Product price
            </label>
            <input
              className="w-full p-2 rounded border border-gray-200 shadow-sm"
              type="number"
              id="productPrice"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#AAC4F5" }}
              htmlFor="productStock"
            >
              Product stock
            </label>
            <input
              className="w-full p-2 rounded border border-gray-200 shadow-sm"
              type="number"
              id="productStock"
              placeholder="Enter product stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#AAC4F5" }}
              htmlFor="productDescription"
            >
              Product description
            </label>
            <textarea
              className="w-full p-2 rounded border border-gray-200 shadow-sm h-28"
              id="productDescription"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#AAC4F5" }}
              htmlFor="productCategory"
            >
              Product category
            </label>
            <input
              className="w-full p-2 rounded border border-gray-200 shadow-sm"
              type="text"
              id="productCategory"
              placeholder="Enter product category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#AAC4F5" }}
              htmlFor="productImage"
            >
              Product image URL
            </label>
            <input
              className="w-full p-2 rounded border border-gray-200 shadow-sm"
              type="text"
              id="productImage"
              placeholder="Enter product image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-md font-semibold text-white shadow"
              onClick={handleCreateProduct}
              style={{ backgroundColor: "#8CA9FF" }}
            >
              Create Product
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateProduct;
