import mongoose, { Schema } from "mongoose";
import { IActivityLog } from "./activity.interface";

const ActivityLogSchema = new Schema<IActivityLog>(
    {
        message: { type: String, required: [true, "Message is required"] },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const ActivityLog = mongoose.model<IActivityLog>("ActivityLog", ActivityLogSchema);
