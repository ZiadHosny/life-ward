import { FastCost } from "../models/fastCost.model";
import {
  getAllItems,
  getOneItemById,
  deleteOneItemById,
  createNewItem,
  updateOneItemById,
} from './factory.controller';

/*
@desc    Get All FastCost
@route   Get /api/v1/occasions
@access  Private (Admin)
*/ 
export const getAllFastCosts = getAllItems(FastCost)

/*
@desc    Get Specific FastCost By Id
@route   Get /api/v1/occasions/:id
@access  Private (Admin)
*/ 
export const getFastCostById = getOneItemById(FastCost)

/*
@desc    Create New FastCost 
@route   POST /api/v1/occasions 
@access  Private (Admin)
*/ 
export const addFastCost = createNewItem(FastCost)

/*
@desc    Update FastCost By Id
@route   PUT /api/v1/occasions/:id
@access  Private (Admin)
*/
export const updateFastCost = updateOneItemById(FastCost)

/*
@desc    Delete FastCost By Id
@route   DELETE /api/v1/occasions/:id
@access  Private (Admin)
*/ 
export const deleteFastCost = deleteOneItemById(FastCost);




