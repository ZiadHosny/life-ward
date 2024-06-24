import Joi from "joi";
import { IOrder } from "../interfaces/order/order.interface";

export const createOrderValidation = Joi.object({
  city: Joi.string().required(),
  phone: Joi.string().required(),
  name: Joi.string().required(),
  area: Joi.string().optional(),
  address: Joi.string().required(),
  country: Joi.string().required(),
  postalCode: Joi.string().optional(),
  orderNotes: Joi.string().optional(),
  email: Joi.string().email().required(),
  Longitude: Joi.string().optional(),
  Latitude: Joi.string().optional(),
  fastDelivery: Joi.boolean().required(),
  congratzStatus: Joi.boolean().required(),
  receiveDate: Joi.date().when("fastDelivery", {
    is: false,
    then: Joi.date().required(),
    otherwise: Joi.date().optional().allow(""),
  }),
  properties: Joi.optional(),
  congratz: Joi.object().when("congratzStatus", {
    is: true,
    then: Joi.object({
      type: Joi.string().valid("text", "voice", "video").required(),
      content: Joi.object({
        from: Joi.string().required(),
        to: Joi.string().required(),
        data: Joi.string().required(),
      }),
    }),
    otherwise: Joi.forbidden(),
  }),
});

export const createOnlineOrderValidation = Joi.object({
  type: Joi.string().valid("creditcard").required(),
  cvc: Joi.string().length(3).required(),
  month: Joi.number().min(1).max(12).required(),
  year: Joi.string().length(4).required(),
  number: Joi.string().length(16).required(),
  name: Joi.string().required(),
});

export const verifyOrderValidation = Joi.object({
  code: Joi.string().length(6).required(),
  phone: Joi.string().trim().required(),
});

export const changeOrderStatusValidation = Joi.object<IOrder>({
  status: Joi.string().valid("in delivery", "delivered", "return").required(),
});

export const deleteGroupOfOrdersValidation = Joi.object({
  ids: Joi.array().items(Joi.string().hex().required()).required(),
});