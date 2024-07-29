import { Router } from "express";
import { changeCityDefault, createCity, deleteCityById, getAllCities, getCityById, updateCityById } from "../controllers/city.controller";
import { allowedTo } from "../middlewares/allowedTo.middleware";
import { protectedMiddleware } from "../middlewares/protected.middleware";
import { Role } from "../interfaces/user/user.interface";
import { createCityValidator, deleteCityValidator, getCityByIdValidator, updateCityValidator } from "../validations/validations/city.validator";
import { limitsMiddleware } from "../middlewares/limits.middleware";

const cityRouter = Router();

cityRouter
    .route("/")
    .get(getAllCities)
    .post(
        protectedMiddleware,
        allowedTo(Role.RootAdmin, Role.AdminA, Role.AdminB),
        limitsMiddleware("City"),
        createCityValidator,
        createCity
    )

cityRouter
    .route('/:id')
    .get(getCityByIdValidator, getCityById)
    .put(
        protectedMiddleware,
        allowedTo(Role.RootAdmin, Role.AdminA, Role.AdminB),
        updateCityValidator,
        updateCityById
    )
    .delete(
        protectedMiddleware,
        allowedTo(Role.RootAdmin, Role.AdminA, Role.AdminB),
        deleteCityValidator,
        deleteCityById
    )

cityRouter
    .route('/changeDefault/:id')
    .patch(
        protectedMiddleware,
        allowedTo(Role.RootAdmin, Role.AdminA, Role.AdminB),
        changeCityDefault,
    )

export default cityRouter;
