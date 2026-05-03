const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Product = require("./Product.js");

const Variant = sequelize.define(
  "Variant",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    productId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Product, key: 'id' } },
    sku: { type: DataTypes.STRING, unique: true, allowNull: false },
    color: { type: DataTypes.STRING },
    size: { type: DataTypes.STRING },
    priceAdjustment: { type: DataTypes.DECIMAL(10, 2), default: 0 },
    stock: { type: DataTypes.INTEGER, default: 0 }
  },
  {
    timestamps: true,
  },
);

// Define associations
Variant.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Variant, { foreignKey: 'productId' });

module.exports=Variant;
