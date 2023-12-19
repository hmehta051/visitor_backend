const mongoose = require("mongoose");

const drinksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  serve_member_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Waiter",
    required: true,
  },
});

const DrinksModel = mongoose.model("Drink", drinksSchema);

module.exports = DrinksModel;
