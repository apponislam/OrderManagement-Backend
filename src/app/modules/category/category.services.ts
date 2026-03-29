import httpStatus  from 'http-status';
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

export const CategoryServices = {
    createCategory,
    getAllCategories,
};
