import { Schema, model } from "mongoose";
import { IFastCost } from "../interfaces/fastCost/fastCost.interface";

const fastCostSchema = new Schema<IFastCost>({
  value: {
    type: Number,
    require: true,
  },
});

export const FastCost = model("fastCost", fastCostSchema);
