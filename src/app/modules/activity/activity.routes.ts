import { Router } from "express";
import { ActivityControllers } from "./activity.controllers";
import auth from "../../middlewares/auth";
import authorize from "../../middlewares/authorized";

const router = Router();

router.get("/", auth, authorize(["admin", "manager"]), ActivityControllers.getAllActivities);

export const ActivityRoutes = router;
