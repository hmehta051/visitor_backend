const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const StaffModel = require("../models/staff.model");
const upload = require("../middlewares/upload");

router.post(
  "/",
  upload.single("image"),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("mobile").notEmpty().withMessage("Mobile is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let filePath = "";
      if (req.file) {
        filePath = req.file.path;
      }

      const staffMember = await StaffModel.create({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        image: filePath,
      });

      return res.status(201).json(staffMember);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const staff = await StaffModel.find().lean().exec();
    return res.status(200).send({ status: "success", staff });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const staff = await StaffModel.findById(req.params.id).lean().exec();
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    return res.status(200).json(staff);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
