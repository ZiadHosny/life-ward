import { Notification } from "../models/notification.model";
// import { io } from "../config/io_connection";
import { io } from "../index";
import { User } from "../models/user.model";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { Status } from "../interfaces/status/status.enum";

export const notificationUtils = async (
  title: string,
  message: string,
  sender: string,
  receiver: string
) => {
  try {
    let notification = {};
    const receivers = receiver.split(",");
    for (const receiver of receivers) {
      notification = await Notification.create({
        title,
        message,
        sender,
        receiver: receiver.toString(),
      });
      io.emit(receiver.toString(), notification);
    }
    notification = {
      title,
      message,
      sender,
      receiver,
    };
    return notification; // Continue to the next middleware or route
  } catch (error) {
    return -1; // Pass any errors to the error-handling middleware
  }
};

// create notification controller

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
