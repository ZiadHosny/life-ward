import { Router } from "express";
import { findBestLocation } from "../controllers/general.controller";

const generalRouter = Router();

generalRouter
    .route("/bestLocation")
    .post(findBestLocation);



export default generalRouter;
