import Order from "../model/orderModel.js";
import Product from "../model/productModel.js";
import User from "../model/userModel.js";
import getDetailsFromToken from "../helper/getDetialsFromToken.js";

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { products, shippingAddress, paymentMethod } = req.body;
    const token = req.headers["authorization"].split(" ")[1];
    const userDetails = getDetailsFromToken(token);
    const userId = userDetails.userId;

    if (!products || products.length === 0) {
      return res.status(400).send("Products are required");
    }

    // Validate and fetch product details
    let totalPrice = 0;
    const orderProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res
          .status(404)
          .send(`Product with id ${item.productId} not found`);
      }

      if (product.stock < item.quantity) {
        return res
          .status(400)
          .send(`Insufficient stock for product ${product.name}`);
      }

      const itemTotal = product.price * item.quantity;
      totalPrice += itemTotal;

      orderProducts.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        total: itemTotal,
      });

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    const newOrder = new Order({
      userId,
      products: orderProducts,
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    await newOrder.save();
    const populatedOrder = await newOrder.populate("userId", "-password");

    res.status(201).json({
      message: "Order created successfully",
      order: populatedOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Get all orders (admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "-password")
      .populate("products.productId");

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Get user's orders
const getUserOrders = async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const userDetails = getDetailsFromToken(token);
    const userId = userDetails.userId;

    const orders = await Order.find({ userId })
      .populate("products.productId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Get single order by ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate("userId", "-password")
      .populate("products.productId");

    if (!order) {
      return res.status(404).send("Order not found");
    }

    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).send("Status is required");
    }

    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).send("Invalid status");
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status, updatedAt: Date.now() },
      { new: true },
    )
      .populate("userId", "-password")
      .populate("products.productId");

    if (!order) {
      return res.status(404).send("Order not found");
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { isPaid } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        isPaid,
        paidAt: isPaid ? Date.now() : null,
        updatedAt: Date.now(),
      },
      { new: true },
    )
      .populate("userId", "-password")
      .populate("products.productId");

    if (!order) {
      return res.status(404).send("Order not found");
    }

    res.status(200).json({
      message: "Payment status updated successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).send("Order not found");
    }

    res.status(200).json({
      message: "Order deleted successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
};
