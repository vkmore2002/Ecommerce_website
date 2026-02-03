import React from "react";
import { useState } from "react";
import "./CreateProduct.css";
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
    <div className="product-root">
      <section className="form-card">
        <h2 className="form-title">Create Product</h2>

        <form className="form-grid" onSubmit={handleCreateProduct}>
          <div className="form-row full">
            <label className="form-label" htmlFor="productName">
              Product name
            </label>
            <input
              className="form-input"
              type="text"
              id="productName"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label className="form-label" htmlFor="productPrice">
              Product price
            </label>
            <input
              className="form-input"
              type="number"
              id="productPrice"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label className="form-label" htmlFor="productStock">
              Product stock
            </label>
            <input
              className="form-input"
              type="number"
              id="productStock"
              placeholder="Enter product stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div className="form-row full">
            <label className="form-label" htmlFor="productDescription">
              Product description
            </label>
            <textarea
              className="form-textarea"
              id="productDescription"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label className="form-label" htmlFor="productCategory">
              Product category
            </label>
            <input
              className="form-input"
              type="text"
              id="productCategory"
              placeholder="Enter product category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label className="form-label" htmlFor="productImage">
              Product image URL
            </label>
            <input
              className="form-input"
              type="text"
              id="productImage"
              placeholder="Enter product image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="form-row full actions">
            <button type="submit" className="btn btn-primary">
              Create Product
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateProduct;
