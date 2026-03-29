import mongoose, { Schema } from "mongoose";
import { IUser } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: [true, "Name is required"] },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            index: true,
            match: [/.+\@.+\..+/, "Please enter a valid email address"],
        },
        password: { type: String, required: [true, "Password is required"], select: false },
        role: {
            type: String,
            enum: ["admin", "manager"],
            required: [true, "Role is required"],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

UserSchema.pre("save", async function () {
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
});

// set '' to password after saving user
UserSchema.post("save", function (doc) {
    doc.password = "";
});

export const User = mongoose.model<IUser>("User", UserSchema);
