const { product} = require("../models/product.model");
const { category} = require( "../models/category.model");
const { MONGO_DB_CONFIG} = require("../config/app.config");
const { response } = require("express");

async function createProduct(params, callback) {
    if (!params.productName){
        return callback(
            {
                message: "Product Name required",
            },
            ""
        );
    }

    if (!params.category){
        return callback(
            {
                message: "Category required",
            },
            ""
        );
    }

    const productModel = new product(params);
    productModel.save()
    .then((response) => {
        return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    })
}

async function getProduct(params, callback) {
    const productName = params.productName;
    const categoryId = params.categoryId;
    var condition = {};

    if (productName){
        condition["productName"]={
            $regex: new RegExp(productName), $options: "i"

        };
    }

    if (categoryId){
        condition["categoryId"]= categoryId;
    }

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1

    product
    
    .find(condition, "productName productDescription productPrice productImage stockStatus createdAt updatedAt")
    .sort(params.sort)
    .populate("category", "categoryName CategoryImage")
    .limit(perPage)
    .skip(perPage * page)
    .then((response)=>{
        return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}
async function getProductById(params, callback) {
    const productId = params.productId;

    product
    .findById(productId)
    .populate("category", "categoryName CategoryImage")
    .then((response)=>{
        return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}
async function updateProduct(params, callback) {
    const productId = params.productId;

    product
    .findByIdAndUpdate(productId, params,{useFindAndModify: false})
    .then((response)=>{
        if(!response){
            callback('Cannot update Product with id ${productId}')
        }
        else callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}
async function deleteProduct(params, callback) {
    const productId = params.productId;

    product
    .findByIdAndRemove(productId)
    .then((response)=>{
        if(!response){
            callback('Cannot update Product with id ${productId}')
        }
        else callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}
module.exports ={
    createProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct
};