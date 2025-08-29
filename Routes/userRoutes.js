import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
// const path = req.body.params
// const query = req.url.query
const id = 10;
router.get("/profile/", authMiddleware(["admin", "user"]), (req, res) => {
  console.log("Hello")
 const path = req.params;
 const userid = req.params.id;
 console.log(userid);
  res.json({ message: "User Profile Page" });
});

router.get("/products", authMiddleware(["admin", "user"]), (req, res) => {
  res.json({ message: "Products List Page" });
});

export default router;
