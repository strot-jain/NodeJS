import express from "express";
import adminRoutes from "./Routes/adminRoutes.js";
import userRoutes from "./Routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use("/api", adminRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Role-based Access Control Example");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
