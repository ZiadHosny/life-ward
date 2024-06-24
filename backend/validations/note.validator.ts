import Joi from "joi";
import { INote } from "../interfaces/note/note.interface";
export const noteValidation = Joi.object<INote>({
    value: Joi.string().alter({
        post: (schema) => schema.required(),
        put: (schema) => schema.optional(),
      }),
});