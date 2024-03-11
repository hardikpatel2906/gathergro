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
        cb(null, Date.now() + "_" + file.originalname);
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, files, cb) => {
        let ext = path.extname(files.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.PNG' && ext !== '.JPG' && ext !== '.JPEG') {
            cb("Only images are allowd", null);
        }
        cb(null, true);
    }
})

/**
 * Create Product 
 */
const createProduct = async (req, res) => {
    try {
        // await upload(req, res, async () => {
        //     let file = req.files;
        //     console.log(file);
        //     if (file) {
        //         let imgArr = []
        //         if (file.length > 0) {
        //             for (let fl of file) {
        //                 imgArr.push(fl.filename);
        //             }
        //         }
        //         console.log(imgArr)

        const { productName, vendorId, category, price, description, quantity, available } = req.body;
        const product = new productModel({ productName, productImages: req.file.filename, vendorId, category, price, description, quantity, available });

        const createdProduct = await product.save();

        if (createdProduct) {
            res.json(successResponse(200, alertMessage.products.createSuccess, createdProduct));
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


/**
 * LIST PRODUCTS BY USER
 */
const listProductsByUser = async (req, res) => {
    try {
        const userId = req.query.userId;
        const productsData = await productModel.find({ vendorId: userId });
        if (productsData && productsData.length > 0) {
            res.json(successResponse(200, alertMessage.products.listSuccess, productsData));
        } else {
            res.json(successResponse(200, alertMessage.products.noProducts, []));
        }
    } catch (error) {
        res.json(errorResponse(500, alertMessage.products.listError, {}));
    }
};


const deleteProduct = async(req, res) => {
    try {
        if(req.query.productId){
            const deletedProduct = await productModel.findByIdAndDelete()
        }else{
            // ProductId is required
        }
    } catch (error) {
        
    }
}

module.exports = { createProduct, listProducts, listProductsByUser, upload };
