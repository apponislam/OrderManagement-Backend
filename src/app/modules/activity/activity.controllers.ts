import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { Request, Response } from "express";
import { ActivityServices } from "./activity.services";

const getAllActivities = catchAsync(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    
    const result = await ActivityServices.getAllActivities(page, limit);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Activity logs fetched successfully",
        meta: result.meta,
        data: result.data,
    });
});

export const ActivityControllers = {
    getAllActivities,
};
