import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import config from "../../config";
import { Request, Response } from "express";
import { AuthServices } from "./auth.services";

const signup = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.signup(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User signed up successfully",
        data: result,
    });
});

const login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.login(req.body);

    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: config.node_env === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: result,
    });
});

export const AuthControllers = {
    signup,
    login,
};
