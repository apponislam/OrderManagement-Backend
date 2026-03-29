import { ActivityLog } from "./activity.model";

const getAllActivities = async () => {
    const result = await ActivityLog.find().sort({ createdAt: -1 }).limit(10);
    return result;
};

export const ActivityServices = {
    getAllActivities,
};
