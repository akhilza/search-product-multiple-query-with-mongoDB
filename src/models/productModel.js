import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ProductModel = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    description: { type: String, required: true }
})