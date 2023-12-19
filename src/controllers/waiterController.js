const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const WaiterModel = require("../models/waiter.model");

router.post(
  "",
  body("name").notEmpty().withMessage("Name is required"),
  body("mobile").notEmpty().withMessage("Mobile is required"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, mobile } = req.body;
      const waiterDetail = await WaiterModel.create({
        name,
        mobile,
      });

      return res.status(201).json({
        status: "success",
        waiterDetail,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const waiter = await WaiterModel.find().lean().exec();
    return res.status(200).json(waiter);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const waiter = await WaiterModel.findById(req.params.id).lean().exec();
    if (!waiter) {
      return res.status(404).json({ message: "Waiter not found" });
    }
    return res.status(200).json(waiter);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
