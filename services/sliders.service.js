const { slider} = require("../models/slider.model");
const{ MONGO_DB_CONFIG} = require( "../config/app.config");
const { response } = require("express");

async function createSlider(params, callback) {
    if(!params.sliderName){
        return callback({
            message: "Slider Name Required"
        });
    }
    const model = new slider(params);
    model
    .save()
    .then ((response) => {
        return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    })

}




async function getSlider(params, callback) {

    const sliderName = params.sliderName;
    var condition = sliderName ? {sliderName:{ $regex: new RegExp(sliderName), $options: "i"}} : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.pageSize;
}