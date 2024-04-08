const productModel = require("../models/productModel");
const { successResponse, errorResponse } = require("../helpers/responseHelper");
const { alertMessage } = require("../helpers/messageHelper");
const multer = require("multer");
const path = require("path");

// ------------------ | File Upload | -------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/product_images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, files, cb) => {
    let ext = path.extname(files.originalname);
    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".PNG" &&
      ext !== ".JPG" &&
      ext !== ".JPEG"
    ) {
      cb("Only images are allowd", null);
    }
    cb(null, true);
  },
});

/**
 * Create Product
 */
const createProduct = async (req, res) => {
  try {
    const { productName, vendorId, categoryId, price, description, quantity, available } = req.body;

    // console.log(categoryId);
    const product = new productModel({
      productName,
      productImages: req.file.filename,
      vendorId,
      categoryId,
      price,
      description,
      quantity,
      available,
    });

    const createdProduct = await product.save();

    if (createdProduct) {
      res.json(
        successResponse(
          200,
          alertMessage.products.createSuccess,
          createdProduct
        )
      );
    } else {
      res.json(errorResponse(500, alertMessage.products.createError, {}));
    }
    //     } else {

    //     }
    // })
  } catch (error) {
    console.log(error);
    res.json(errorResponse(500, alertMessage.products.createError, error));
  }
};


/**
 * List Products
 */
const listProducts = async (req, res) => {
  try {
    const productsData = await productModel.find().populate("vendorId", "username").populate("categoryId", "categoryName");
    if (productsData && productsData.length > 0) {
      res.json(
        successResponse(200, alertMessage.products.listSuccess, productsData)
      );
    } else {
      res.json(successResponse(200, alertMessage.products.noProducts, []));
    }
  } catch (error) {
    res.json(errorResponse(500, alertMessage.products.listError, {}));
  }
};


/**
 * LIST PRODUCTS BY USER
 */
const listProductsByUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    const productsData = await productModel.find({ vendorId: userId });
    if (productsData && productsData.length > 0) {
      res.json(
        successResponse(200, alertMessage.products.listSuccess, productsData)
      );
    } else {
      res.json(successResponse(200, alertMessage.products.noProducts, []));
    }
  } catch (error) {
    res.json(errorResponse(500, alertMessage.products.listError, {}));
  }
};

/**
 * DELETE PRODUCT
 */
const deleteProduct = async (req, res) => {
  try {
    if (req.query.productId) {
      const productData = await productModel.findById(req.query.productId);
      if (productData) {
        const deletedProduct = await productModel.findByIdAndDelete(req.query.productId);
        if (deletedProduct) {
          res.status(200).json(successResponse(200, alertMessage.products.deleteSucces, deletedProduct))
        } else {
          res.status(500).json(errorResponse(500, alertMessage.products.deleteError, {}));
        }
      } else {
        res.status(500).json(errorResponse(500, alertMessage.products.noProducts, {}));
      }
    } else {
      // ProductId is required
      res.status(500).json(errorResponse(500, alertMessage.products.idRequired, {}));
    }
  } catch (error) {
    res.status(500).json(errorResponse(500, alertMessage.products.deleteError, {}));
  }
}


/**
 * INCREASE QUANTITY
 */
const increaseQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (productId) {
      const productData = await productModel.findById(productId);
      if (productData) {
        const updatedProductQty = await productModel.findByIdAndUpdate(productId, { $inc: { quantity: Number(quantity) } });
        if (updatedProductQty) {
          res.status(200).json(successResponse(200, alertMessage.products.updateSuccess, updatedProductQty))
        } else {
          res.status(500).json(errorResponse(500, alertMessage.products.updateError, {}));
        }
      } else {
        res.status(500).json(errorResponse(500, alertMessage.products.noProducts, {}));
      }
    } else {
      // ProductId is required
      res.status(500).json(errorResponse(500, alertMessage.products.idRequired, {}));
    }
  } catch (error) {
    res.status(500).json(errorResponse(500, alertMessage.products.updateError, {}));
  }
}


/**
 * GET PRODUCT BY ID
 */
const getProductDetailById = async (req, res) => {
  try {
    const productId = req.query.productId;
    if (productId) {
      const productData = await productModel.findById(productId);
      if (productData) {
        res.status(200).json(successResponse(200, alertMessage.products.listSuccess, productData))
      } else {
        res.status(500).json(errorResponse(500, alertMessage.products.noProducts, {}));
      }
    } else {
      // ProductId is required
      res.status(500).json(errorResponse(500, alertMessage.products.idRequired, {}));
    }
  } catch (error) {
    res.status(500).json(errorResponse(500, alertMessage.products.listError, {}));
  }
}



module.exports = { createProduct, listProducts, listProductsByUser, deleteProduct, upload, increaseQuantity, getProductDetailById };
