const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const upload = require("../middleware/upload");

router.post("/", upload.single('image'), productController.createProducts);
router.get("/", productController.getAllProducts);
router.put("/:id", upload.single('image'), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
