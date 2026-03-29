import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { jwtHelper } from "../../../utils/jwtHelper";
import config from "../../config";
import { User } from "./auth.model";
import bcrypt from "bcrypt";
import { IUser } from "./auth.interface";

const signup = async (payload: IUser) => {
    const isUserExist = await User.findOne({ email: payload.email });

    if (isUserExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
    }

    const newUser = await User.create(payload);
    return newUser;
};

const login = async (payload: any) => {
    const { email, password } = payload;

    const isUserExist = await User.findOne({ email }).select("+password");

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);

    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.FORBIDDEN, "Password does not match");
    }

    const jwtPayload = {
        _id: isUserExist._id,
        name: isUserExist.name,
        email: isUserExist.email,
        role: isUserExist.role,
    };

    const accessToken = jwtHelper.generateToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expire as string,
    );

    const refreshToken = jwtHelper.generateToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expire as string,
    );

    return {
        accessToken,
        refreshToken,
    };
};

export const AuthServices = {
    signup,
    login,
};
