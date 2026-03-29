import mongoose, { Schema } from "mongoose";
import { IOrder, IOrderItem } from "./order.interface";

const OrderItemSchema = new Schema<IOrderItem>({
    productId: {
        type: String,
        ref: "Product",
        required: [true, "Product is required"],
    },
    productName: { type: String, required: [true, "Product name is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    quantity: { type: Number, required: [true, "Quantity is required"] },
});

const OrderSchema = new Schema<IOrder>(
    {
        customerName: { type: String, required: [true, "Customer name is required"] },
        items: { type: [OrderItemSchema], required: [true, "Order items are required"] },
        totalPrice: { type: Number, required: [true, "Total price is required"] },
        status: {
            type: String,
            enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
