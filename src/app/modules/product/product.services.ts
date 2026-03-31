import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";
import { ActivityLog } from "../activity/activity.model";
import mongoose from "mongoose";

const createProduct = async (payload: IProduct) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const result = await Product.create([payload], { session });

        // Activity Log
        await ActivityLog.create([{ message: `Product "${payload.name}" added to inventory` }], { session });

        await session.commitTransaction();
        session.endSession();

        return result[0];
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
};

const getAllProducts = async () => {
    const result = await Product.find().populate("categoryId");
    return result;
};

const updateProduct = async (id: string, payload: Partial<IProduct>) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const isProductExist = await Product.findById(id).session(session);
        if (!isProductExist) {
            throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
        }

        // If stock is being updated, handle status
        if (payload.stock !== undefined) {
            if (payload.stock === 0) {
                payload.status = "out-of-stock";
            } else if (payload.stock > 0) {
                payload.status = "active";
            }
        }

        const result = await Product.findByIdAndUpdate(id, payload, { returnDocument: 'after', session });

        // Activity Log
        if (payload.stock !== undefined) {
            await ActivityLog.create([{ message: `Stock updated for "${isProductExist.name}" to ${payload.stock}` }], { session });
        }

        await session.commitTransaction();
        session.endSession();

        return result;
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
};

export const ProductServices = {
    createProduct,
    getAllProducts,
    updateProduct,
};
