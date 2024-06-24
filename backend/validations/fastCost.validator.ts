import Joi from "joi";
import { IFastCost } from "../interfaces/fastCost/fastCost.interface";

export const fastCostValidation = Joi.object<IFastCost>({
    value: Joi.number().alter({
        post: (schema) => schema.required(),
        put: (schema) => schema.optional(),
      }),
});
