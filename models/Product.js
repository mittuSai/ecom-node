const { DataTypes } = require("sequelize");

const sequelize = require("../config/db.js");

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    basePrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    image: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
  },
);
module.exports = Product;
