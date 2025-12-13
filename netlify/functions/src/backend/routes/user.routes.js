import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import {
  register, login, logout, profile,
  getAll, getById, createOne, updateById, removeById, removeAll
} from "../controllers/user.controller.js";

const router = Router();

// Auth
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", auth, profile);

// CRUD
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createOne);
router.put("/:id", updateById);
router.delete("/:id", removeById);
router.delete("/", removeAll);

export default router;
