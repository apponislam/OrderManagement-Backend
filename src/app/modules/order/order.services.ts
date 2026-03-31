import httpStatus from "http-status";
import mongoose from "mongoose";
import ApiError from "../../../errors/ApiError";
import { Product } from "../product/product.model";
import { Order } from "./order.model";
import { IOrder } from "./order.interface";
import { ActivityLog } from "../activity/activity.model";
import { IOrderItem } from "./order.interface";

const createOrder = async (payload: IOrder) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const { customerName, items } = payload;

        // 1. Conflict Detection: Prevent duplicate products in the same order
        const productIds = items.map((item) => item.productId);
        const uniqueProductIds = new Set(productIds);
        if (uniqueProductIds.size !== productIds.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Duplicate product entries in the same order.");
        }

        let totalCalculatedPrice = 0;

        for (const item of items as IOrderItem[]) {
            const product = await Product.findById(item.productId).session(session);

            if (!product) {
                throw new ApiError(httpStatus.NOT_FOUND, `Product with ID ${item.productId} not found.`);
            }

            // 2. Conflict Detection: Prevent ordering inactive products
            if (product.status === "out-of-stock") {
                throw new ApiError(httpStatus.BAD_REQUEST, `This product "${product.name}" is currently unavailable.`);
            }

            // 3. Stock Handling Rules: If requested quantity exceeds stock
            if (item.quantity > product.stock) {
                throw new ApiError(httpStatus.BAD_REQUEST, `Only ${product.stock} items available in stock for product "${product.name}".`);
            }

            // 4. Deduct stock automatically
            product.stock -= item.quantity;

            // 5. If stock becomes 0, status -> Out of Stock
            if (product.stock === 0) {
                product.status = "out-of-stock";
            }

            await product.save({ session });

            item.productName = product.name;
            item.price = product.price;
            totalCalculatedPrice += product.price * item.quantity;
        }

        payload.totalPrice = totalCalculatedPrice;
        const newOrder = await Order.create([payload], { session });

        // Activity Log: Track recent system actions
        await ActivityLog.create([{ message: `Order #${newOrder[0]._id} created for customer "${customerName}"` }], { session });

        await session.commitTransaction();
        session.endSession();

        return newOrder[0];
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
};

const updateOrderStatus = async (id: string, status: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const isOrderExist = await Order.findById(id).session(session);
        if (!isOrderExist) {
            throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
        }

        // Conflict Detection: Prevent updating a cancelled order
        if (isOrderExist.status === "cancelled") {
            throw new ApiError(httpStatus.BAD_REQUEST, "Cannot update a cancelled order.");
        }

        const result = await Order.findByIdAndUpdate(id, { status }, { returnDocument: 'after', session });

        // Activity Log: Consistent with other transaction-based methods
        await ActivityLog.create([{ message: `Order #${id} marked as ${status}` }], { session });

        await session.commitTransaction();
        session.endSession();

        return result;
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
};

const getAllOrders = async (query: any) => {
    const { date, status } = query;
    const filter: any = {};

    if (date) {
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);
        filter.createdAt = { $gte: startDate, $lt: endDate };
    }

    if (status) {
        filter.status = status;
    }

    const result = await Order.find(filter).sort({ createdAt: -1 });
    return result;
};

const cancelOrder = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const order = await Order.findById(id).session(session);
        if (!order) {
            throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
        }

        if (order.status === "cancelled") {
            throw new ApiError(httpStatus.BAD_REQUEST, "Order is already cancelled");
        }

        if (order.status === "delivered") {
            throw new ApiError(httpStatus.BAD_REQUEST, "Cannot cancel a delivered order.");
        }

        // Restore stock
        for (const item of order.items as IOrderItem[]) {
            const product = await Product.findById(item.productId).session(session);
            if (product) {
                product.stock += item.quantity;
                if (product.stock > 0) {
                    product.status = "active";
                }
                await product.save({ session });
            }
        }

        order.status = "cancelled";
        await order.save({ session });

        // Activity Log
        await ActivityLog.create([{ message: `Order #${id} cancelled` }], { session });

        await session.commitTransaction();
        session.endSession();

        return order;
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
};

export const OrderServices = {
    createOrder,
    updateOrderStatus,
    getAllOrders,
    cancelOrder,
};
