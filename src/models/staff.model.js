const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: [{ type: String, required: true }],
    email: { type: String, required: true },
    mobile: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const StaffModel = mongoose.model("Staff", staffSchema);
module.exports = StaffModel;
