const productServices = require("../services/products.service");
const upload = require("../middleware/product.upload");

exports.create = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            return next(err);
        } else {
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            const model = {
                productName: req.body.productName,
                category: req.body.category,
                productDescription: req.body.productDescription,
                productPrice: req.body.productPrice,
                stockStatus: req.body.stockStatus,
                productImage: path != "" ? "/" + path : ""
            };

            productServices.createProduct(model, (error, results) => {
                if (error) {
                    return next(error);
                } else {
                    return res.status(200).send({
                        message: "Success",
                        data: results
                    });
                }
            });
        }
    });
};

exports.findAll = (req, res, next) => {
    const model = {
        productName: req.query.productName,
        categoryId: req.query.categoryId,
        pageSize: req.query.pageSize,
        page: req.query.page,
        sort: req.query.sort // Added missing comma here
    };

    productServices.getProduct(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
};

exports.findOne = (req, res, next) => {
    const model = {
        productId: req.params.id
    };

    productServices.getByProductId(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
};

exports.update = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            return next(err);
        } else {
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            const model = {
                productId: req.params.id,
                productName: req.body.productName,
                category: req.body.category,
                productDescription: req.body.productDescription,
                productPrice: req.body.productPrice,
                stockStatus: req.body.stockStatus,
                productImage: path != "" ? "/" + path : ""
            };

            productServices.updateProduct(model, (error, results) => {
                if (error) {
                    return next(error);
                } else {
                    return res.status(200).send({
                        message: "Success",
                        data: results
                    });
                }
            });
        }
    });
};

exports.delete = (req, res, next) => {
    const model = {
        productId: req.params.id
    };

    productServices.deleteProduct(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
};
