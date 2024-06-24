import Joi from "joi";
import { IOccasion } from "../interfaces/occasion/occasion.interface";

export const occasionValidation = Joi.object<IOccasion>({
  name: Joi.string().alter({
    post: (schema) => schema.required(),
    put: (schema) => schema.optional(),
  }),
  icon: Joi.string().alter({
    post: (schema) => schema.required(),
    put: (schema) => schema.optional(),
  }),
  description: Joi.string().optional().allow(""),
  phone: Joi.string().alter({
    post: (schema) => schema.required(),
    put: (schema) => schema.optional(),
  }),
  date: Joi.date().alter({
    post: (schema) => schema.required(),
    put: (schema) => schema.optional(),
  }),
  isSent: Joi.boolean().optional(),
});
