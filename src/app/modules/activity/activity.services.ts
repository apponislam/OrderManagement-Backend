import { ActivityLog } from "./activity.model";

const getAllActivities = async (page: number = 1, limit: number = 10) => {
    const skip = (page - 1) * limit;
    const result = await ActivityLog.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

    const total = await ActivityLog.countDocuments();

    return {
        data: result,
        meta: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        },
    };
};

export const ActivityServices = {
    getAllActivities,
};
