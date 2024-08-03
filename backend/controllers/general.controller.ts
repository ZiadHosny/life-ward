import { findNearest } from 'geolib'
import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { City } from "../models/city.model";


export const findBestLocation = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { lat, lng } = req.body

        const cities = await City.find({})

        const bestLocation = findNearest(
            { lat, lng },
            cities.map((e) => ({ lat: e.lat, lng: e.lng }))
        )

        const nearestCity = await City.findOne({ ...bestLocation })

        res.status(201).json({
            status: "success",
            data: nearestCity,
            success_en: "get best Location successfully",
            success_ar: "تم استرجاع افضل موقع",
        });
    }
)