import { Note } from "../models/note.modal";
import {
  getAllItems,
  getOneItemById,
  deleteOneItemById,
  createNewItem,
  updateOneItemById,
} from './factory.controller';
/*
@desc    Get All Notes
@route   Get /api/v1/notes
@access  Private (Admin)
*/ 
export const getAllNotes = getAllItems(Note);


/*
@desc    Get Specific Note By Id
@route   Get /api/v1/notes/:id
@access  Private (Admin)
*/ 
export const getNoteById = getOneItemById(Note);

/*
@desc    Create New Note 
@route   POST /api/v1/notes 
@access  Private (Admin)
*/ 
export const createNote = createNewItem(Note)


/*
@desc    Update Note By Id
@route   PUT /api/v1/notes/:id
@access  Private (Admin)
*/
export const updateNote = updateOneItemById(Note);


/*
@desc    Delete Note By Id
@route   DELETE /api/v1/notes/:id
@access  Private (Admin)
*/ 
export const deleteNote = deleteOneItemById(Note);