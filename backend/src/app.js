const express = require("express");
const cors = require("./middlewares/cors")
const api = require("./routes/index");

const app = express();

app.set("port", process.env.PORT || 4000);

app.use(express.json());

app.use(cors({ origin: true }));

app.options("*", cors());

app.get('/', (req, res) => { res.send('REST API - MEAN'); });

app.use('/api', Object.values(api));

module.exports = app;