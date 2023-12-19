const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const DrinksModel = require("../models/drinks.model");
const upload = require("../middlewares/upload");
const verifyToken = require("../middlewares/authorize");

router.post(
  "/",
  upload.single("image"),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("serve_member_id")
      .notEmpty()
      .withMessage("server member id is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name, serve_member_id } = req.body;
      let filePath = "";
      if (req.file) {
        filePath = req.file.path;
      }

      const drinks = await DrinksModel.create({
        name,
        image: filePath,
        serve_member_id,
      });

      return res.status(201).json(drinks);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }
);

router.get("/", verifyToken, async (req, res) => {
  try {
    const drinks = await DrinksModel.find().lean().exec();
    return res.status(200).json(drinks);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const drinks = await DrinksModel.findById(req.params.id).lean().exec();
    if (!drinks) {
      return res.status(404).json({ message: "Drinks member not found" });
    }
    return res.status(200).json(drinks);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
