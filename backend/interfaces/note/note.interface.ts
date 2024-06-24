import { Document } from "mongoose";

export interface INote extends Document{
    value: string;
  }