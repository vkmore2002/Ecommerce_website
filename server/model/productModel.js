import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  // Reviews stored as subdocuments so we can show them on the product page
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      firstName: { type: String },
      rating: { type: Number },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  // Cached average rating
  rating: { type: Number, default: 0 },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
