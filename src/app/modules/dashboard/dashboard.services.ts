import { Order } from "../order/order.model";
import { Product } from "../product/product.model";

const getDashboardStats = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalOrdersToday = await Order.countDocuments({
        createdAt: { $gte: today },
    });

    const pendingOrders = await Order.countDocuments({ status: "pending" });
    const completedOrders = await Order.countDocuments({ status: "delivered" });

    const lowStockItems = await Product.find({
        $expr: { $lt: ["$stock", "$minStockThreshold"] },
    });

    const revenueTodayResult = await Order.aggregate([
        { $match: { createdAt: { $gte: today }, status: { $ne: "cancelled" } } },
        { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
    ]);

    const revenueToday = revenueTodayResult.length > 0 ? revenueTodayResult[0].totalRevenue : 0;

    const productSummary = await Product.find().limit(5);

    return {
        totalOrdersToday,
        pendingOrders,
        completedOrders,
        lowStockItemsCount: lowStockItems.length,
        revenueToday,
        productSummary: productSummary.map((p) => ({
            name: p.name,
            stock: p.stock,
            status: p.stock < p.minStockThreshold ? "Low Stock" : "OK",
        })),
    };
};

const getRestockQueue = async () => {
    const lowStockItems = await Product.find({
        $expr: { $lt: ["$stock", "$minStockThreshold"] },
    }).sort({ stock: 1 });

    return lowStockItems.map((p) => {
        let priority = "Low";
        if (p.stock === 0) priority = "High";
        else if (p.stock < p.minStockThreshold / 2) priority = "Medium";

        return {
            _id: p._id,
            name: p.name,
            stock: p.stock,
            threshold: p.minStockThreshold,
            priority,
        };
    });
};

export const DashboardServices = {
    getDashboardStats,
    getRestockQueue,
};
