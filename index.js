const express = require("express");
const db = require("./config/db");
const Product = require("./models/Product");
const Variant = require("./models/Variants");
const CartItem = require("./models/CartItem");
const { Sequelize, json } = require("sequelize");
const productRoutes = require("./routes/ProductRoutes");
const variantRoutes = require("./routes/VariantRoutes");
const AuthRoutes = require("./routes/Authroutes");

const authMiddleware = require("./middleware/authMiddleware");
const app = express();
app.use(express.json());

// Routes
app.use("/api", AuthRoutes);
app.use("/api/products", authMiddleware, productRoutes);
app.use("/api/variants", authMiddleware, variantRoutes);

db.sync({ alter: false })
  .then(() => {
    console.log("all Table Migrated / updated");
  })
  .catch((err) => console.error("❌ Sync error:", err));
app.listen(3000, () => {
  console.log("app running on port 3000");
});
