import { Router } from "express";
import {
  addOccasion,
  getAllOccasions,
  getAllOccasionsForLoggedUser,
  getOccasionById,
  removeOccasion,
  updateOccasion,
} from "../controllers/occasion.controller";
import { validate } from "../middlewares/validation.middleware";
import { occasionValidation } from "../validations/occasion.validator";
import { protectedMiddleware } from "../middlewares/protected.middleware";
import { allowedTo } from "../middlewares/allowedTo.middleware";
import { Role } from "../interfaces/user/user.interface";
const occasionRouter = Router();

occasionRouter
  .route("/")
  .get(
    protectedMiddleware,
    allowedTo(Role.RootAdmin, Role.AdminA, Role.AdminB),
    getAllOccasions
  )
  .post(
    protectedMiddleware,
    allowedTo(Role.USER),
    validate(occasionValidation),
    addOccasion
  );
occasionRouter
  .route("/forLoggedUser")
  .get(protectedMiddleware, getAllOccasionsForLoggedUser);
occasionRouter
  .route("/:id")
  .get(
    protectedMiddleware,
    allowedTo(Role.RootAdmin, Role.AdminA, Role.AdminB),
    getOccasionById
  )
  .put(
    protectedMiddleware,
    allowedTo(Role.USER),
    validate(occasionValidation),
    updateOccasion
  )
  .delete(protectedMiddleware, allowedTo(Role.USER), removeOccasion);

export default occasionRouter;
