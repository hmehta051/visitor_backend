const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const verifyToken = require("../middlewares/authorize");
const VisitorDrinksModel = require("../models/visitorDrinks.model");

router.post(
  "/",
  [
    body("drink_id").notEmpty().withMessage("Drink Id is required"),
    body("visitor_id").notEmpty().withMessage("Visitor Id is required"),
  ],
  verifyToken,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const visitorDrinks = await VisitorDrinksModel.create({
        visitor_id: req.body.visitor_id,
        drink_id: req.body.drink_id,
      });

      return res.status(201).json({ status: "success", visitorDrinks });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }
);

router.get("/", verifyToken, async (req, res) => {
  try {
    const visitorDrinks = await VisitorDrinksModel.find()
      .populate("drink_id")
      .lean()
      .exec();
    return res.status(200).json({ status: "success", visitorDrinks });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
