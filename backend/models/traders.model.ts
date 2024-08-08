import { Document, ObjectId, Schema, SchemaType, Types, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface ITrader extends Document {
  name: string;
  email: string;
  password: string;
  telPass: string;
  country: Schema.Types.ObjectId;
  city: Schema.Types.ObjectId;
  assignedOrders: Schema.Types.ObjectId[];
}

const traderSchema = new Schema<ITrader>({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  telPass: String,
  country: { type: String, ref: "Neighborhood" },
  city: { type: Types.ObjectId, ref: "City" },
  assignedOrders: [
    {
      id: Types.ObjectId,
      status: String,
      data: Schema.Types.Mixed,
    },
  ],
});
traderSchema.post("save", function () {
  if (this.password && this.isModified("password")) {
    // const salt = bcrypt.genSaltSync(10);
    const salt = +process.env.BCRYPT_SALT;
    this.password = bcrypt.hashSync(this.password, salt);
  }
});

export const Trader = model<ITrader>("Trader", traderSchema);
