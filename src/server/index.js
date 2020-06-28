const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("../routes/index");
const http = require("http");

const app = express();
const server = http.Server(app);
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((resp) => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("error ", error);
  });

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 4000);
