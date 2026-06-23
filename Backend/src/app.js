import express from "express";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

app.get("/", (req, res) => {
  res.send("StyleHub API Running...");
});

export default app;