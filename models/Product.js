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
// Convert image path to full URL
Product.prototype.toJSON = function () {
  const values = { ...this.get() };

  if (values.image) {
    const isFullUrl = /^https?:\/\//i.test(values.image);

    if (!isFullUrl) {
      const baseUrl = process.env.APP_URL.replace(/\/$/, "");

      values.image = `${baseUrl}${values.image}`;
    }
  }

  return values;
};
module.exports = Product;
