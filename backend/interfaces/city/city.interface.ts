import { Document } from "mongoose";

export interface ICity extends Document {
  name_en: string;
  name_ar: string;
  slug: string;
  lat: number;
  lng: number;
  default: boolean
}
