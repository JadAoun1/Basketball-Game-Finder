const express = require("express");
const router = express.Router();

// Sample route
router.get("/", (req, res) => {
  res.send("API is running...");
});

// Example: Route for fetching pickup games (modify as needed)
router.get("/games", (req, res) => {
  res.json([{ id: 1, name: "Downtown 3v3" }, { id: 2, name: "Weekend 5v5" }]);
});

module.exports = router;
