const { DataTypes } = require("sequelize");

const sequelize = require("../config/db.js");

const Variant = require("./Variants.js");

const CartItem = sequelize.define(
  "CartItem",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false, default: 1 },
  },
  {
    timestamps: true,
  },
);

CartItem.belongsTo(Variant, { foreignKey: "variantId" });
Variant.hasMany(CartItem, { foreignKey: "variantId" });
module.exports = CartItem;
