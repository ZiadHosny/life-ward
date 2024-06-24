import { Schema, model } from "mongoose";
import { IOccasion } from "../interfaces/occasion/occasion.interface";
const OccasionSchema = new Schema<IOccasion>({
  name: {
    type: String,
  },
  icon: {
    type: String,
  },
  description: {
    type: String,
  },
  phone: {
    type: String,
  },
  date: {
    type: Date,
  },
  sentDate: {
    type: Date,
  },
  isSent: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
  },
});

export const Occasion = model<IOccasion>("occasion", OccasionSchema);
