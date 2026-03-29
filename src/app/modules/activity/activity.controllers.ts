import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { Request, Response } from "express";
import { ActivityServices } from "./activity.services";

const getAllActivities = catchAsync(async (req: Request, res: Response) => {
    const result = await ActivityServices.getAllActivities();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Activity logs fetched successfully",
        data: result,
    });
});

export const ActivityControllers = {
    getAllActivities,
};
