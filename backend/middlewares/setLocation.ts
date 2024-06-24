import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";
import {Cart} from "../models/cart.model";
import {User} from "../models/user.model";
import crone from 'node-cron'
import {ObjectId} from 'mongodb'

// import Location from "../model/location.model";

export const setLocation = async (req: Request, res: Response, next: NextFunction) => {
    next();
}
export const deleteGustes = async () => {
    const dateAfterOneHour = new Date(new Date().setHours(new Date(Date.now()).getHours() - 1, new Date(Date.now()).getMinutes()))

    let users = (await User.find({
        email: '', createdAt: {
            $lte: dateAfterOneHour,
        }
    })).map(user => (user._id))
   

    await Cart.deleteMany({ user: users })
    await User.deleteMany
    ({ _id: users })
}



