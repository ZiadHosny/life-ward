import { Document, Schema, SchemaType } from "mongoose";

export interface INeighborhood extends Document {
  name_en: string;
  name_ar: string;
  slug: string;
  city: SchemaType;
}
