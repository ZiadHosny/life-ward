import { Router } from "express";
import { createNeighborhood, deleteNeighborhoodById, getAllNeighborhoods, getAllNeighborhoodsByCityId, getNeighborhoodById, updateNeighborhoodById } from "../controllers/neighborhood.controller";

const neighborhoodRouter = Router();

neighborhoodRouter
    .route("/")
    .get(getAllNeighborhoods)
    .post(createNeighborhood)

neighborhoodRouter.route('/:id')
    .get(getNeighborhoodById)
    .put(updateNeighborhoodById)
    .delete(deleteNeighborhoodById)

neighborhoodRouter
    .route("/forSpecificCity/:cityId")
    .get(getAllNeighborhoodsByCityId); //all

export default neighborhoodRouter;
