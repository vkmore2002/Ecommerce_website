import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
} from "../controller/orderController.js";

const orderRouter = Router();

// Public route to check if orders route is working
orderRouter.get("/", (req, res) => {
  res.send("Order route is working");
});

// Create a new order
orderRouter.post("/create", createOrder);

// Get all orders (admin only)
orderRouter.get("/all", getAllOrders);

// Get user's orders
orderRouter.get("/my-orders", getUserOrders);

// Get single order by ID
orderRouter.get("/:orderId", getOrderById);

// Update order status
orderRouter.put("/:orderId/status", updateOrderStatus);

// Update payment status
orderRouter.put("/:orderId/payment", updatePaymentStatus);

// Delete order
orderRouter.delete("/:orderId", deleteOrder);

export default orderRouter;
