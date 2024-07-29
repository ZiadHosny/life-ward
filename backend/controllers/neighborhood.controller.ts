import expressAsyncHandler from "express-async-handler";
import { getAllItems, getOneItemById, deleteOneItemById, updateOneItemById } from "./factory.controller";
import { NextFunction, Request, Response } from "express";
import { Neighborhood } from "../models/neighborhood.model";
import { IQuery } from "../interfaces/factory/factory.interface";
import { ApiFeatures } from "../utils/ApiFeatures";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { Status } from "../interfaces/status/status.enum";

export const getAllNeighborhoods = getAllItems(Neighborhood);

export const getNeighborhoodById = getOneItemById(Neighborhood);

export const getAllNeighborhoodsByCityId = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        // 1- get id from params
        const { cityId } = req.params;

        // 2- get all neighborhoods belong to specific city from mongooseDB
        const query = req.query as IQuery;
        const mongoQuery = Neighborhood.find({ city: cityId.split(",") });
        // 3- create pagination
        const { data, paginationResult } = await new ApiFeatures(mongoQuery, query)
            .populate()
            .filter()
            .limitFields()
            .search()
            .sort()
            .paginate();
        if (data.length === 0) {
            return next(
                new ApiError(
                    {
                        en: "not found",
                        ar: "غير موجود",
                    },
                    StatusCodes.NOT_FOUND
                )
            );
        }

        // 5- send response
        res.status(200).json({
            status: Status.SUCCESS,
            length: data.length,
            paginationResult,
            data: data,
            success_en: "Successfully",
            success_ar: "تم بنجاح",
        });
    }
);

export const deleteNeighborhoodById = deleteOneItemById(Neighborhood);

export const updateNeighborhoodById = updateOneItemById(Neighborhood);

export const createNeighborhood = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        const newNeighborhood = await Neighborhood.create({
            name_en: req.body.name_en,
            name_ar: req.body.name_ar,
            slug: req.body.slug,
            city: req.body.city
        });

        // 5- send response
        res.status(201).json({
            status: "success",
            data: newNeighborhood,
            success_en: "created successfully",
            success_ar: "تم الانشاء بنجاح",
        });
    }
);