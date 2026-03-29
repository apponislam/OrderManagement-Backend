import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { Request, Response } from "express";
import { DashboardServices } from "./dashboard.services";

const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardServices.getDashboardStats();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Dashboard stats fetched successfully",
        data: result,
    });
});

const getRestockQueue = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardServices.getRestockQueue();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Restock queue fetched successfully",
        data: result,
    });
});

export const DashboardControllers = {
    getDashboardStats,
    getRestockQueue,
};
