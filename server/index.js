import dotenv from "dotenv";
dotenv.config();

import express from "express";
import userRouter from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRouter from "./routes/authRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import dbConnection from "./db/dbConnection.js";

import cors from "cors";

const app = express();
const port = 3000;

//middleware for parsing json
app.use(express.json());

app.use(cors());

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5174",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
dbConnection();

app.get("/", (req, res) => {
  res.send("welcome Ecommerce Backend");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
