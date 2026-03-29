import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product.interface";

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: [true, "Product name is required"] },
        categoryId: {
            type: String,
            ref: "Category",
            required: [true, "Category is required"],
        },
        price: { type: Number, required: [true, "Price is required"] },
        stock: { type: Number, required: [true, "Stock is required"] },
        minStockThreshold: {
            type: Number,
            required: [true, "Minimum stock threshold is required"],
        },
        status: {
            type: String,
            enum: ["active", "out-of-stock"],
            default: "active",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
