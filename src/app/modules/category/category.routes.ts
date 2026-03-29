import { Router } from "express";
import { CategoryControllers } from "./category.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryValidations } from "./category.validations";
import auth from "../../middlewares/auth";
import authorize from "../../middlewares/authorized";

const router = Router();

router.post("/", auth, authorize(["admin", "manager"]), validateRequest(CategoryValidations.createCategoryValidationSchema), CategoryControllers.createCategory);

router.get("/", auth, authorize(["admin", "manager"]), CategoryControllers.getAllCategories);

export const CategoryRoutes = router;
