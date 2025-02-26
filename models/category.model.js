const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;


const category = mongoose.model(
    "Category",
    mongoose.Schema(
        {
            categoryName: {
                type: String,
                require: true,
                unique: true,
            },
            categoryDescription: {
                type: String,
                required: false
            },
            categoryImage: {
                type: String
            },
        },{

       
       toJSON: {
        transform: function (doc,ret){
           ret.categoryId = ret._id.toString();
           delete ret._id;
           delete ret._v;

        },

       },
    }
    )

);
module.exports = {
    category,
}