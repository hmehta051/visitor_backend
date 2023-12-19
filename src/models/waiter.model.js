const mongoose = require("mongoose");

const waiterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const WaiterModel = mongoose.model("Waiter", waiterSchema);
module.exports = WaiterModel;
