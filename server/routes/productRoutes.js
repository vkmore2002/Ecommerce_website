import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  modifyProduct,
  deleteProductById,
  getProductById,
} from "../controller/productController.js";

const productRouter = Router();

productRouter.get("/", (req, res) => {
  res.send("Product Router is Working");
});

productRouter.get("/product/:id", getProductById);

//to get all the products from product router
productRouter.get("/get-all", getAllProducts);

//to create new product
productRouter.post("/create", createProduct);

//to modify/update product by it's id
productRouter.put("/product/:id", modifyProduct);

//to delete an product by it's id
productRouter.delete("/product/:id", deleteProductById);

export default productRouter;
