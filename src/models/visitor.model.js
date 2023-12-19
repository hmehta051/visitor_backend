const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String },
    signInDateTime: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const VisitorModel = mongoose.model("Visitor", visitorSchema);
module.exports = VisitorModel;
