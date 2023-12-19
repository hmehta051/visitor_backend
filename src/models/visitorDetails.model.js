const mongoose = require("mongoose");

const visitorDetailsSchema = new mongoose.Schema(
  {
    reason: { type: String, required: true },
    state: { type: String, default: "In Processing" },
    confinedVisitingDateTime: { type: Date, default: Date.now },
    staff_member_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    visitor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const VisitorDetailsModel = mongoose.model(
  "VisitorDetail",
  visitorDetailsSchema
);
module.exports = VisitorDetailsModel;
