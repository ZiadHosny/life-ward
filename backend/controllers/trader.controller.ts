import { NextFunction, Request, Response } from "express";
import { ITrader, Trader } from "../models/traders.model";
import { Order } from "../models/order.model";
import { Error } from "mongoose";
import { getAllItems } from "./factory.controller";
import expressAsyncHandler from "express-async-handler";
import { request } from "http";
import {
  createNotificationAll,
  createNotification as notificationUtils,
} from "../utils/notification";
import IUser from "../interfaces/user/user.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IOrder } from "../interfaces/order/order.interface";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";

// Create a new trader
export const createTrader = async (req: Request, res: Response) => {
  try {
    const trader = new Trader(req.body);
    trader.telPass = trader.password;
    await trader.save();
    res.status(201).json(trader);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const verfiyTrader = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const trader = await Trader.findOne({ email });
    if (!trader) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, trader.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: trader._id, email: trader.email },
      "JWT_SECRET",
      {}
    );

    // Send response
    res.json({ token });
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
};

// Get all traders
export const getTraders = getAllItems(Trader, ["city", "country"]);

// Get a trader by ID
export const getTraderById = async (req: Request, res: Response) => {
  try {
    const trader = await Trader.findById(req.params.id);
    if (!trader) return res.status(404).json({ message: "Trader not found" });
    res.status(200).json(trader);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Update a trader
export const updateTrader = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = req.body.status;
  const orderStatus = status == "Delivered" ? "Done" : status;
  const orderId = req.body.orderId;
  const traderId = req.params.id;
  try {
    // update Trader Order Status
    const trader = await Trader.findOneAndUpdate(
      {
        _id: traderId,
        "assignedOrders.id": orderId,
      },
      {
        $set: {
          "assignedOrders.$.status": status,
        },
      },
      {
        new: true, // Return the modified document
        runValidators: true, // Apply schema validation
      }
    );
    if (!trader) return res.status(404).json({ message: "Trader not found" });
    if (trader && req.body.password) trader.telPass = req.body.password;

    // update OrderStatus byId
    await Order.findByIdAndUpdate(
      orderId,
      { $set: { status: orderStatus } },
      { new: true }
    );

    // create notification from Trader to Admins
    const sender = ((req.user as IUser)?._id).toString(); // add type guard to check if req.user exists
    const title = `Trader Message`;
    const message = `Trader With id ${trader._id} updated Order ${orderId} to Status ${status}`;
    const link = `${process.env.Dash_APP_URL}/orders`;

    let notification = {};
    if (title && message && sender && link) {
      notification = await createNotificationAll(
        title,
        message,
        sender,
        ["rootAdmin", "adminA", "adminB", "adminC", "subAdmin"],
        link
      );
      if (notification === -1) {
        return next(
          new ApiError(
            {
              en: "notification not created",
              ar: "لم يتم إنشاء الإشعار",
            },
            StatusCodes.NOT_FOUND
          )
        );
      }
    }
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Delete a trader
export const deleteTrader = async (req: Request, res: Response) => {
  try {
    const trader = await Trader.findByIdAndDelete(req.params.id);
    if (!trader) return res.status(404).json({ message: "Trader not found" });
    res.status(200).json({ message: "Trader deleted" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Assinging Orders
// update order status
// update trader status
// create notification sent to the trader
export const assignOrdersToTraders = async (req: Request, res: Response) => {
  try {
    const { orderId, traderId } = req.body;

    // Find orders and traders
    const order: IOrder | null = await Order.findOne({ _id: orderId }).populate(
      [
        { path: "user", model: "User", select: "name email phone image" },
        {
          path: "onlineItems.items.product",
          model: "Product",
          select:
            "title_en title_ar priceBeforeDiscount priceAfterDiscount images quantity paymentType deliveryType sendToDelivery",
        },
        {
          path: "cashItems.items.product",
          model: "Product",
          select:
            "title_en title_ar priceBeforeDiscount priceAfterDiscount images quantity paymentType deliveryType sendToDelivery",
        },
        // {
        //   path: "onlineItems.items.repositories.repository",
        //   model: "Repository",
        //   select: "name_en name_ar",
        // },
        // {
        //   path: "cashItems.items.repositories.repository",
        //   model: "Repository",
        //   select: "name_en name_ar",
        // },
      ]
    );
    const trader: ITrader | null = await Trader.findOne({
      _id: { $in: traderId },
    });

    // Update Trader Orders
    if (!trader) {
      return res.status(404).json({ message: "Orders or traders not found" });
    } else {
      await Trader.findByIdAndUpdate(
        trader._id,
        {
          $push: {
            assignedOrders: { id: trader._id, status: "Pending", data: order },
          },
        },
        { new: true }
      );

      // Update Order Status
      await Order.findByIdAndUpdate(
        order?._id,
        { $set: { status: "Sent", assignedTrader: trader } },
        { new: true }
      );

      // create Notification and Send It To The Trader

      await notificationUtils(
        "Urgent Message",
        `new Order With number ${order!._id} has been assigned to you`,
        (req?.user as IUser)?._id.toString(),
        trader._id
      );

      return res.status(200).send({ message: "success" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
