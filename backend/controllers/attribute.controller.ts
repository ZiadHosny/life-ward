import {
    getAllItems,
    getOneItemById,
    updateOneItemById,
    deleteOneItemById,
    createNewItem,
} from './factory.controller';
import { Attribute } from '../models/attribute.model'; 



// @desc    Get All Attributes
// @route   Get /api/v1/attributes
// @access  Private (Admin)
export const getAllAttributes = getAllItems(Attribute);


// @desc    Get Specific Attribute By Id
// @route   Get /api/v1/attributes/:id
// @access  Private (Admin)
export const getAttributeById = getOneItemById(Attribute);

// @desc    Create New Attribute
// @route   POST /api/v1/attributes
// @access  Private (Admin)
export const createAttribute = createNewItem(Attribute)


// @desc    Update Attribute By Id
// @route   PUT /api/v1/attributes/:id
// @access  Private (Admin)
export const updateAttribute = updateOneItemById(Attribute);


// @desc    Delete Attribute By Id
// @route   DELETE /api/v1/attributes/:id
// @access  Private (Admin)
export const deleteAttribute = deleteOneItemById(Attribute);