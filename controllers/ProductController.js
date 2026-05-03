const { Model } = require("sequelize");
const Product = require("../models/Product");
const Variant = require("../models/Variants");
const { response } = require("express");

exports.createProducts = async (req, resp) => {
  try {
    const { name, basePrice, description } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const product = await Product.create({
      name,
      description,
      basePrice: parseFloat(basePrice),
      image: imagePath,
    });
    resp.status(201).json({
      status: true,
      message: "Product Added Successfully.",
      data: product,
    });
  } catch (error) {
    resp.status(500).json({
      status: false,
      message: "something went Wrong",
      error: error.message,
    });
  }
};
exports.getAllProducts = async (req, resp) => {
  try {
    const page = parseInt(req.queary.page) || 1;
    const perPage = parseInt(req.queary.limit) || 10;
    const products = await Product.findAll({
      include: [
        {
          Model: Variant,
          attributes: ["id", "sku", "priceAdjustment", "stock"],
        },
      ],
    });
    resp.status(200).json({
      status: true,
      message: "products fetched successfully",
      data: products,
    });
  } catch (error) {
    resp.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.json({
        status: false,
        messege: "product Not Found",
      });
    }

    const { name, basePrice, description } = req.body;

    let imagePath = product.image;

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    await product.update({
      name: name || product.name,
      description:
        description !== undefined ? description : product.description,
      basePrice: basePrice ? parseFloat(basePrice) : product.basePrice,
    });

    res.json({
      status: true,
      Message: "Product Updated Successfully.",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;   // Correct way

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Product ID is required",
      });
    }

    // Find product first (optional but good for image cleanup)
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    
    if (product.image) {
      const fs = require("fs").promises;
      const imagePath = `.${product.image}`; // e.g., ./uploads/abc.jpg

      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.error("Failed to delete image:", err.message);
        // Don't stop deletion if image file is missing
      }
    }

    // Delete the product
    await product.destroy();

    // Alternative (shorter way):
    // await Product.destroy({ where: { id } });

    res.status(200).json({
      status: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
