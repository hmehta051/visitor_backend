require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const VisitorModel = require("../models/visitor.model");

const newToken = (visitor) => {
  return jwt.sign({ visitor: visitor }, "" + process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
};

router.post(
  "/auth",

  body("mobile").notEmpty().withMessage(""),
  body("name").notEmpty().withMessage(""),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let visitor = await VisitorModel.create(req.body);
      const token = newToken(visitor);
      return res.status(201).send({ status: "success", visitor, token });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const visitor = await VisitorModel.find().lean().exec();
    return res.status(200).json(visitor);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const visitor = await VisitorModel.findById(req.params.id).lean().exec();
    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }
    return res.status(200).json(visitor);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
