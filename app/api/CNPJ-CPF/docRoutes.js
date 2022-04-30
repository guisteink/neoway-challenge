const express = require("express");
const router = express.Router();

const docController = require("./docController");

router
    .post("/validate", (req, res, next) => docController.validate(req, res, next))

    .post("/", (req, res, next) => docController.create(req, res, next))
    .get("/:id", (req, res, next) => docController.getById(req, res, next))
    .put("/:id", (req, res, next) => docController.updateById(req, res, next))
    .delete("/:id", (req, res, next) => docController.deleteById(req, res, next))

    .post("/blocklist", (req, res, next) => docController.addToBlockList(req, res, next))
    .delete("/blocklist/:id", (req, res, next) => docController.removeFromBlockList(req, res, next))

module.exports = router;