import { Schema , Document} from "mongoose";

export interface IOccasion  extends Document {
  name: string;
  icon: string;
  description: string;
  phone: string;
  date: Date;
  sentDate: Date;
  isSent: boolean;
  user: Schema.Types.ObjectId;
}
