const Variant = require("../models/Variants");
const Product = require("../models/Product");

exports.createVariant = async (req, res) => {
  try {
    const { productId, sku, color, size, priceAdjustment, stock } = req.body;

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",

        
      });
    }

    const variant = await Variant.create({
      productId,
      sku,
      color,
      size,
      priceAdjustment: priceAdjustment ? parseFloat(priceAdjustment) : 0,
      stock: stock ? parseInt(stock) : 0,
    });

    res.status(201).json({
      status: true,
      message: "Variant created successfully",
      data: variant,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getAllVariants = async (req, res) => {
  try {
    const variants = await Variant.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "name", "basePrice"],
        },
      ],
    });

    res.status(200).json({
      status: true,
      message: "Variants fetched successfully",
      data: variants,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getVariantById = async (req, res) => {
  try {
    const { id } = req.params;
    const variant = await Variant.findByPk(id, {
      include: [
        {
          model: Product,
          attributes: ["id", "name", "basePrice"],
        },
      ],
    });

    if (!variant) {
      return res.status(404).json({
        status: false,
        message: "Variant not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Variant fetched successfully",
      data: variant,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.updateVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const variant = await Variant.findByPk(id);

    if (!variant) {
      return res.status(404).json({
        status: false,
        message: "Variant not found",
      });
    }

    const { sku, color, size, priceAdjustment, stock } = req.body;

    await variant.update({
      sku: sku || variant.sku,
      color: color !== undefined ? color : variant.color,
      size: size !== undefined ? size : variant.size,
      priceAdjustment: priceAdjustment ? parseFloat(priceAdjustment) : variant.priceAdjustment,
      stock: stock !== undefined ? parseInt(stock) : variant.stock,
    });

    res.status(200).json({
      status: true,
      message: "Variant updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.deleteVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const variant = await Variant.findByPk(id);

    if (!variant) {
      return res.status(404).json({
        status: false,
        message: "Variant not found",
      });
    }

    await variant.destroy();

    res.status(200).json({
      status: true,
      message: "Variant deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
