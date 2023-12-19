const express = require("express");
const cors = require("cors");
const visitorAuthController = require("./controllers/visitorAuthController");
const staffController = require("./controllers/staffController");
const visitorDetailsController = require("./controllers/visitorDetailsController");
const waiterController = require("./controllers/waiterController");
const drinksController = require("./controllers/drinksController");
const visitorDrinks = require("./controllers/visitorDrinksController");

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/visitor", visitorAuthController);
app.use("/api/staff", staffController);
app.use("/api", visitorDetailsController);
app.use("/api/waiter", waiterController);
app.use("/api/drinks", drinksController);
app.use("/api/visitor-drinks", visitorDrinks);

module.exports = app;
