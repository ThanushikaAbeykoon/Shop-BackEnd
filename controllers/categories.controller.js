// controllers/categories.controller.js
const categoriesService = require("../services/categories.service");
const upload = require("../middleware/category.upload");

exports.create = (req, res, next) => {
    upload(req, res, function(err) {
        if (err) {
            return next(err); // Pass the error to the next middleware
        }
        
        const path = req.file ? req.file.path.replace(/\\/g, "/") : "";
        const model = {
            categoryName: req.body.categoryName,
            categoryDescription: req.body.categoryDescription,
            categoryImage: path ? "/" + path : "",
        };
        
        categoriesService.createCategory(model, (error, results) => {
            if (error) {
                return next(error);
            }
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        });
    });
};

// Define other methods similarly...
exports.findAll = (req, res) => {
    // Logic to find all categories
};

exports.findOne = (req, res) => {
    // Logic to find one category by ID
};

exports.update = (req, res) => {
    // Logic to update a category
};

exports.delete = (req, res) => {
    // Logic to delete a category
};
