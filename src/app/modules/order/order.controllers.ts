import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { Request, Response } from "express";
import { OrderServices } from "./order.services";

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderServices.createOrder(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Order created successfully",
        data: result,
    });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const result = await OrderServices.updateOrderStatus(id as string, status);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order status updated successfully",
        data: result,
    });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderServices.getAllOrders(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Orders fetched successfully",
        meta: result.meta,
        data: result.data,
    });
});

const cancelOrder = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OrderServices.cancelOrder(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order cancelled successfully",
        data: result,
    });
});

export const OrderControllers = {
    createOrder,
    updateOrderStatus,
    getAllOrders,
    cancelOrder,
};
