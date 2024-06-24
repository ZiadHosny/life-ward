import { Router } from "express";
import {
  getAllFastCosts,
  getFastCostById,
  deleteFastCost,
  addFastCost,
  updateFastCost,
} from "../controllers/fastCost.controller";
import { Role } from "../interfaces/user/user.interface";
import { validate } from "../middlewares/validation.middleware";
import { fastCostValidation } from "../validations/fastCost.validator";
import { allowedTo } from "../middlewares/allowedTo.middleware";
import { protectedMiddleware } from "../middlewares/protected.middleware";
const fastCostRouter = Router();
fastCostRouter
  .route("/")
  .get(protectedMiddleware, getAllFastCosts)
  .post(
    validate(fastCostValidation),
    protectedMiddleware,
    allowedTo(Role.RootAdmin, Role.AdminA),
    addFastCost
  );

fastCostRouter
  .route("/:id")
  .get(
    protectedMiddleware,
    getFastCostById
  )
  .put(
    protectedMiddleware,
    allowedTo(Role.RootAdmin, Role.AdminA),
    validate(fastCostValidation),
    updateFastCost
  )
  .delete(
    protectedMiddleware,
    allowedTo(Role.RootAdmin, Role.AdminA),
    deleteFastCost
  );
export default fastCostRouter;
