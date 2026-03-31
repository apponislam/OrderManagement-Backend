import httpStatus from "http-status";
import { ICategory } from "./category.interface";
import { Category } from "./category.model";
import { ActivityLog } from "../activity/activity.model";
import mongoose from "mongoose";
import ApiError from "../../../errors/ApiError";

const createCategory = async (payload: ICategory) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const result = await Category.create([payload], { session });

        // Activity Log
        await ActivityLog.create([{ message: `Category "${payload.name}" created` }], { session });

        await session.commitTransaction();
        session.endSession();

        return result[0];
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
};

const getAllCategories = async () => {
    const result = await Category.find();
    return result;
};

const updateCategory = async (id: string, payload: Partial<ICategory>) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const result = await Category.findByIdAndUpdate(id, payload, { returnDocument: "after", session });

        if (!result) {
            throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
        }

        // Activity Log
        await ActivityLog.create([{ message: `Category "${result.name}" updated` }], { session });

        await session.commitTransaction();
        session.endSession();

        return result;
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
};

const deleteCategory = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const result = await Category.findByIdAndDelete(id, { session });

        if (!result) {
            throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
        }

        // Activity Log
        await ActivityLog.create([{ message: `Category "${result.name}" deleted` }], { session });

        await session.commitTransaction();
        session.endSession();

        return result;
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
};

export const CategoryServices = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
