import { Schema, model } from "mongoose";
import { INote } from "../interfaces/note/note.interface";

const noteSchema = new Schema<INote>({
  value: {
    type: String,
    require: true,
  },
});

export const Note = model("note", noteSchema);
