import { Document, ObjectId, Schema, SchemaType, Types, model } from "mongoose";
import { IOrder } from "../interfaces/order/order.interface";

export interface ITrader extends Document {
  name: string;
  email: string;
  password: string;
  country: string;
  city: SchemaType;
  assignedOrders: IOrder[] | IOrder["_id"];
}

const traderSchema = new Schema<ITrader>({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  country: { type: String, ref: "Neighborhood" },
  city: { type: Types.ObjectId, ref: "City" },
  assignedOrders: [{ type: Types.ObjectId, ref: "Order" }],
});

export const Trader = model<ITrader>("Trader", traderSchema);
