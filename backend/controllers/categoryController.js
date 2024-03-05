const { alertMessage } = require("../helpers/messageHelper");
const { successResponse, errorResponse } = require("../helpers/responseHelper");
const categoryModel = require("../models/categoryModel");


const createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const category = new categoryModel({ categoryName });
        const createdCategory = await category.save();

        res.status(200).json(successResponse(200, alertMessage.categoty.createSuccess, createdCategory));
    } catch (error) {
        res.status(500).json(errorResponse(500, alertMessage.categoty.createError, error));
    }
};


/**
 * LIST CATEGORIES
 */
const listCategories = async (req, res) => {
    try {
        const listCategories = await categoryModel.find({ isActive: true });
        if (listCategories && listCategories.length > 0) {
            res.status(200).json(successResponse(200, alertMessage.categoty.listSuccess, listCategories));
        } else {
            res.status(200).json(successResponse(200, alertMessage.categoty.noCategories, listCategories));
        }
    } catch (error) {
        res.status(500).json(errorResponse(500, alertMessage.categoty.listError, error));

    }
};

module.exports = { createCategory, listCategories };