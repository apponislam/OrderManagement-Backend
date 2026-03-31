import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { Request, Response } from "express";
import { CategoryServices } from "./category.services";

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryServices.createCategory(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Category created successfully",
        data: result,
    });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryServices.getAllCategories();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Categories fetched successfully",
        data: result,
    });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryServices.updateCategory(id as string, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category updated successfully",
        data: result,
    });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryServices.deleteCategory(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category deleted successfully",
        data: result,
    });
});

export const CategoryControllers = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
