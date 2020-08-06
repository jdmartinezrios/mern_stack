const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost/mearnstack";

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const conection = mongoose.connection;

conection.once("open", () => {
    console.log("db is connected!");
});