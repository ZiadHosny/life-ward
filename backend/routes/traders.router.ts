import { Router } from "express";
import {
  createTrader,
  getTraders,
  getTraderById,
  updateTrader,
  deleteTrader,
  verfiyTrader,
  assignOrdersToTraders,
} from "../controllers/trader.controller";

const traderRouter = Router();

traderRouter.post("/", createTrader);
traderRouter.get("/", getTraders);
traderRouter.post("/assignOrder", assignOrdersToTraders);
traderRouter.post("/verify", verfiyTrader);
traderRouter.get("/:id", getTraderById);
traderRouter.put("/:id", updateTrader);
traderRouter.delete("/:id", deleteTrader);

export default traderRouter;
