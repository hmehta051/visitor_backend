const express = require("express");
const router = express.Router();

const VisitorDetail = require("../models/visitorDetails.model");

const { body, validationResult } = require("express-validator");
const StaffModel = require("../models/staff.model");
const verifyToken = require("../middlewares/authorize");

// Function to send SMS notification using Twilio
function sendNotificationSMS(recipientNumber, message) {
  console.log(recipientNumber, message);
}

router.post(
  "/confirm-visit",
  [
    body("reason").notEmpty().withMessage("Reason is required"),
    body("staff_member_id")
      .notEmpty()
      .withMessage("Staff Member Id is required"),
    body("visitor_id").notEmpty().withMessage("Visitor Id is required"),
  ],
  verifyToken,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { reason, staff_member_id, visitor_id } = req.body;

      // Create a visitor detail entry
      const visitorDetail = await VisitorDetail.create({
        staff_member_id,
        visitor_id,
        reason,
      });

      const staff = await StaffModel.findById(staff_member_id);
      if (staff) {
        //function to send SMS notifications
        sendNotificationSMS(
          staff.mobile,
          "Your visitor details have been confirmed."
        );
      }

      return res.status(201).json({
        status: "success",
        message: "Visitor details stored and notification sent.",
        visitorDetail,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

router.get("/member-list", verifyToken, async (req, res) => {
  try {
    const vDetails = await VisitorDetail.find()
      .populate("staff_member_id")
      .lean()
      .exec();

    return res.status(200).json({
      status: "success",
      vDetails,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
