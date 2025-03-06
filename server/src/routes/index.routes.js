const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const gameRoutes = require("./game.routes");
const formatResponse = require("../utils/formatResponse");

router.use("/auth", authRoutes);
router.use("/games", gameRoutes);

router.use("*", (req, res) => {
  res
    .status(404)
    .json(formatResponse(404, "Not found", null, "Resource not found"));
});

module.exports = router;
