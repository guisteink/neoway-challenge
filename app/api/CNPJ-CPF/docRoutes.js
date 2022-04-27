const express = require("express");
const router = express.Router();

const docController = require("./docController");

router
    .post("/validate", (req, res) => docController.validate(req, res))
    .post("/", (req, res) => docController.create(req, res))
    .get("/:id", (req, res) => docController.getById(req, res))
    .put("/:id", (req, res) => docController.updateById(req, res))
    .delete("/:id", (req, res) => docController.deleteById(req, res))


module.exports = router;