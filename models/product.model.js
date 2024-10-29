const mongoose = require("mongoose");

const product = mongoose.model(
    "Product",
    mongoose.Schema(
        {
            productName:{
                type: String,
                required: true,
                unquie: true,
            },
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
            },
            productDescription: {
                type: String,
                required: true,
            },
            productPrice:{
                type: Number,
                required: true,
                default: 0
            },
            productImage:{
                type: String
            },
            stockStatus:{
                type: String,
                default: "IN"
            }
        },{

        
        toJSON: {
           transform: function(doc, ret){
            ret.productId = ret._id.toString();
            delete ret._id;
            delete ret._v;

           } 

        }
    }
    )
);

module.exports ={
    product
}