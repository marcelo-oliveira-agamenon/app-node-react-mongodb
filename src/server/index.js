const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("../routes/index");

const app = express();
dotenv.config();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((resp) => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("error ", error);
  });

app.use(express.json());
app.use(routes);
app.listen(process.env.PORT || 4000);
