import { NextFunction, Request, Response } from "express";
import { Occasion } from "../models/occasion.model";
import expressAsyncHandler from "express-async-handler";
import IUser from "../interfaces/user/user.interface";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import {
  getAllItems,
  getOneItemById,
  updateOneItemById,
  deleteOneItemById,
} from './factory.controller';
import { Status } from "../interfaces/status/status.enum";

/*
@desc    Get All Occasions
@route   Get /api/v1/occasions
@access  Private (Admin)
*/ 
export const getAllOccasions = getAllItems(Occasion)
/*
@desc    Get Specific Occasion By Id
@route   Get /api/v1/occasions/:id
@access  Private (Admin)
*/ 
export const getOccasionById = getOneItemById(Occasion)
/*
@desc    Get All Occasions For Logged User
@route   Get /api/v1/occasions/forLoggedUser
@access  Private (Admin)
*/ 
export const getAllOccasionsForLoggedUser = expressAsyncHandler(
  async (req: Request, res: Response,next:NextFunction ) => {
    const occasions: any = await Occasion.find({
      user: (req?.user as IUser)?._id,
    }).populate("user");
    if (occasions.length <= 0) {
      return next(
        new ApiError(
          {
            en: "Not occasions",
            ar: "لا توجد مناسبات",
          },
          StatusCodes.BAD_REQUEST
        )
      );
    }
    res.status(200).send({
      success: true,
      occasions,
      message_en: "Occasions are fetched successfully",
      message_ar: "تم جلب المناسبات بنجاح",
    });
  }
);
/*
@desc    Create New Occasion
@route   POST /api/v1/occasions
@access  Private (Admin)
*/
export const addOccasion = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const existedOccasion = await Occasion.findOne({
      user: (req?.user as IUser)._id,
      "occasion.name": req.body.name,
    });
    if (existedOccasion) {
      return next(
        new ApiError(
          {
            en: "Occasion is already existed",
            ar: "المناسبة موجودة بالفعل",
          },
          StatusCodes.BAD_REQUEST
        )
      );
    }
    const sentDate = new Date(req.body.date);
    sentDate.setMinutes(sentDate.getMinutes() - 2 * 24 * 60);
    const isSent = false;

    let newOccasion = new Occasion({...req.body, sentDate, isSent, user: (req?.user as IUser)._id });
    newOccasion.save();
    res.status(200).json({
      status: Status.SUCCESS,
        data: newOccasion,
        success_en: "created successfully",
        success_ar: "تم الانشاء بنجاح",
    });
  }
);
/*
@desc    Update Occasion By Id
@route   PUT /api/v1/occasions/:id
@access  Private (Admin)
*/ 
export const removeOccasion = deleteOneItemById(Occasion)
/*
@desc    Delete Occasion By Id
@route   DELETE /api/v1/occasions/:id
@access  Private (Admin)
*/ 
export const updateOccasion = updateOneItemById(Occasion)
