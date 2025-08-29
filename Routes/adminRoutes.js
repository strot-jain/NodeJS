import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin/dashboard", authMiddleware("admin"), (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

router.get("/admin/settings", authMiddleware("admin"), (req, res) => {
  res.json({ message: "Admin Settings Page" });
});

export default router;

