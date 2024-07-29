import expressAsyncHandler from "express-async-handler";
import { City } from "../models/city.model";
import { getAllItems, getOneItemById, deleteOneItemById, updateOneItemById } from "./factory.controller";
import { NextFunction, Request, Response } from "express";

export const getAllCities = getAllItems(City);

export const getCityById = getOneItemById(City);

export const deleteCityById = deleteOneItemById(City);

export const updateCityById = updateOneItemById(City);

export const createCity = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        const newCity = await City.create({
            name_en: req.body.name_en,
            name_ar: req.body.name_ar,
            slug: req.body.slug,
            lat: req.body.lat,
            lng: req.body.lng,
            default: req.body.default
        });

        // 5- send response
        res.status(201).json({
            status: "success",
            data: newCity,
            success_en: "created successfully",
            success_ar: "تم الانشاء بنجاح",
        });
    }
);

export const changeCityDefault = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;

        await City.updateMany({}, { $set: { default: false } });

        // // Set the specified default to true
        await City.findByIdAndUpdate(id, { default: true });

        // 5- send response
        res.status(201).json({
            status: "success",
            success_en: "changes successfully",
            success_ar: "تم التعديل بنجاح",
        });
    }
);