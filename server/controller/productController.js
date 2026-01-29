import Product from "../model/productModel.js";

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    if (!name || !description || !price || !stock || !category) {
      return res.status(400).send("All fields are required");
    }

    const newProduct = {
      name,
      description,
      price,
      stock,
      category,
    };

    await Product.create(newProduct);
    return res.status(201).send("Product created successfully");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const modifyProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
    });

    if (!product) {
      return res.status(404).send("Product not found");
    }

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    return res.status(200).send("Product deleted successfully");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

export {
  createProduct,
  getAllProducts,
  modifyProduct,
  deleteProductById,
  getProductById,
};
