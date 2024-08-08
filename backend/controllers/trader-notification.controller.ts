import { Notification } from "../models/notification.model";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
// import { io } from "../config/io_connection";
import { io } from "../index";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { Status } from "../interfaces/status/status.enum";
import IUser from "../interfaces/user/user.interface";
import { createNotification as notificationUtils } from "../utils/notification";

// create notification controller

export const createNotificationController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { title, message, receiver } = req.body;
    const sender = (req.user as IUser)?._id; // add type guard to check if req.user exists
    const notification = await notificationUtils(
      title,
      message,
      sender.toString(),
      receiver
    );
    // Broadcast the notification to all connected clients
    res.status(StatusCodes.CREATED).json({
      status: Status.SUCCESS,
      data: notification,
      success_en: "created successfully",
      success_ar: "تم الانشاء بنجاح",
    });
  }
);

export const markNotificationAsReadSocket = async (Id: string) => {
  // Update the notification by its ID to set 'read' to true
  const notification = await Notification.findByIdAndUpdate(
    Id,
    { read: true },
    { new: true }
  );
  // 3- check if document not found
  if (!notification) {
    return new ApiError(
      {
        en: `Not Found Any Result For This Id ${Id}`,
        ar: `${Id}لا يوجداي نتيجة لهذا`,
      },
      StatusCodes.NOT_FOUND
    );
  }
  io.emit("updateNotification", notification);
  return {
    status: Status.SUCCESS,
    data: notification,
    message: "Notification marked as read",
    success_en: "updated successfully",
    success_ar: "تم التعديل بنجاح",
  };
};
