const express = require("express");
const db = require("./config/db");
const Product = require("./models/Product");
const Variant = require("./models/Variants");
const CartItem = require("./models/CartItem");
const { Sequelize, json } = require("sequelize");
const productRoutes = require("./routes/ProductRoutes");
const variantRoutes = require("./routes/VariantRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/variants", variantRoutes);

db.sync({ alter: true })
  .then(() => {
    console.log("all Table Migrated / updated");
  })
  .catch((err) => console.error("❌ Sync error:", err));
app.listen(3000, () => {
  console.log("app running on port 3000");
});
