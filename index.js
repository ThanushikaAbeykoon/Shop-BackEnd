const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_DB_CONFIG } = require("./config/app.config");
const errors = require("./middleware/errors.js");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./swagger.json");

mongoose.Promise = global.Promise;

mongoose
    .connect(MONGO_DB_CONFIG.DB, {
        useNewUrlParser: true,  // Corrected option
        useUnifiedTopology: true,
    })
    .then(
        () => {
            console.log("Database connected");
        },
        (error) => {
            console.log("Database can't be connected: " + error);
        }
    );

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", require("./routes/app.routes"));
app.use(errors.errorHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT || 4000, function () {
    console.log("Ready to GO!");
});
