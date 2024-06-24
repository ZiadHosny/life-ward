import { Router } from "express";
import { validate } from "../middlewares/validation.middleware";
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/note.controller";
import { noteValidation } from "../validations/note.validator";
import { Role } from "../interfaces/user/user.interface";
import { allowedTo } from "../middlewares/allowedTo.middleware";
import { protectedMiddleware } from "../middlewares/protected.middleware";
const noteRouter = Router();
noteRouter
  .route("/")
  .get(protectedMiddleware,getAllNotes)
  .post(
    validate(noteValidation),
    protectedMiddleware,
    allowedTo(Role.RootAdmin, Role.AdminA),
    createNote
  );
noteRouter
  .route("/:id")
  .get(protectedMiddleware,getNoteById)
  .put(
    protectedMiddleware,
    allowedTo(Role.RootAdmin, Role.AdminA),
    validate(noteValidation),
    updateNote
  )
  .delete(
    protectedMiddleware,
    allowedTo(Role.RootAdmin, Role.AdminA),
    deleteNote
  );
export default noteRouter;
