import { Request, Response } from "express";
import { Trader } from "../models/traders.model";
import { Order } from "../models/order.model";
import { Error } from "mongoose";
import { getAllItems } from "./factory.controller";

// Create a new trader
export const createTrader = async (req: Request, res: Response) => {
  try {
    const trader = new Trader(req.body);
    await trader.save();
    res.status(201).json(trader);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Get all traders
export const getTraders = getAllItems(Trader, ['city', 'country'])

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
export const updateTrader = async (req: Request, res: Response) => {
  try {
    const trader = await Trader.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!trader) return res.status(404).json({ message: "Trader not found" });
    res.status(200).json(trader);
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
export const assignOrdersToTraders = async (req: Request, res: Response) => {
  try {
    const { orderIds, traderIds } = req.body;

    // Find orders and traders
    const orders = await Order.find({ _id: { $in: orderIds } });
    const traders = await Trader.find({ _id: { $in: traderIds } });

    if (orders.length === 0 || traders.length === 0) {
      return res.status(404).json({ message: "Orders or traders not found" });
    }
    // Update traders with assigned orders
    for (let trader of traders) {
      trader.assignedOrders = [
        ...new Set([...trader.assignedOrders, ...orderIds]),
      ];
      await trader.save();
    }

    res.status(200).json({ message: "Orders assigned to traders" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
