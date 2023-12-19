const mongoose = require("mongoose");

const visitorDrinksSchema = new mongoose.Schema({
  visitor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visitor",
    required: true,
  },
  drink_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drink",
      required: true,
    },
  ],
  state: {
    type: String,
    default: "Completed",
  },
  serve_DateTime: {
    type: Date,
    default: Date.now,
  },
});

const VisitorDrinksModel = mongoose.model("VisitorDrink", visitorDrinksSchema);

module.exports = VisitorDrinksModel;
