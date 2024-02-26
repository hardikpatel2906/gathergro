const productModel = require("../models/productModel");
const { successResponse, errorResponse } = require("../helpers/responseHelper");
const { alertMessage } = require("../helpers/messageHelper");
const multer = require("multer");
const path = require("path");


// ------------------ | File Upload | -------------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/product_images');
    },
    filename: (req, file, cb) => {
        return cb(null, Date.now() + "_" + file.originalname);
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, files, cb) => {
        let ext = path.extname(files.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.PNG' && ext !== '.JPG' && ext !== '.JPEG') {
            return cb("Only images are allowd", null);
        }
        cb(null, true);
    }
}).array("products")

/**
 * Create Product 
 */
const createProduct = async (req, res) => {
    try {
        await upload(req, res, async () => {
            let file = req.files;
            if (file) {
                let imgArr = []
                if (file.length > 0) {
                    for (let fl of file) {
                        imgArr.push(fl.filename);
                    }
                }
                console.log(imgArr)
                const { productName, vendorId, category, price, description, quantity, available } = req.body;
                const product = new productModel({ productName, productImages: imgArr, vendorId, category, price, description, quantity, available });

                const createdProduct = await product.save();

                if (createdProduct) {
                    res.json(successResponse(200, alertMessage.products.createSuccess, createdProduct));
                } else {
                    res.json(errorResponse(500, alertMessage.products.createError, {}));
                }
            } else {

            }
        })


    } catch (error) {
        res.json(errorResponse(500, alertMessage.products.createError, error));
    }
};

const listProducts = async (req, res) => {
    try {
        const productsData = await productModel.find();
        if (productsData && productsData.length > 0) {
            res.json(successResponse(200, alertMessage.products.listSuccess, productsData));
        } else {
            res.json(successResponse(200, alertMessage.products.noProducts, []));
        }
    } catch (error) {
        res.json(errorResponse(500, alertMessage.products.listError, {}));
    }
};

module.exports = { createProduct, listProducts };
