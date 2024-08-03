import mongoose, { Document, ObjectId, Schema, model } from "mongoose";
import { IOrder } from "../interfaces/order/order.interface";

export interface ITrader extends Document {
  name: string;
  email: string;
  password: string;
  country: string;
  city: string;
  assignedOrders: IOrder[] | IOrder["_id"];
}

const traderSchema = new Schema<ITrader>({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  country: { type: String },
  city: { type: String },
  assignedOrders: [{ orderId: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

export const Trader = model<ITrader>("Trader", traderSchema);
