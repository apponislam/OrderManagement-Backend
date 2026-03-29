import { User } from "./auth.model";
import config from "../../config";
import { IUser } from "./auth.interface";

export const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({
            role: "admin",
        });

        if (!adminExists) {
            console.log("📝 No admin found, creating one...");

            const adminData: IUser = {
                name: "Admin User",
                email: config.superAdminEmail as string,
                password: config.superAdminPassword as string,
                role: "admin",
            };

            await User.create(adminData);

            console.log("✅ Admin created:", config.superAdminEmail);
        } else {
            console.log("✅ Admin already exists, skipping creation");
        }
    } catch (error) {
        console.error("❌ Error seeding admin:", error);
    }
};
