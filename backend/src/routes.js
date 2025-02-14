const express = require("express");
const router = express.Router();

// Sample public route
router.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

// Public Routes (No Auth Needed)
router.get("/games", (req, res) => {
  res.json([{ id: 1, name: "Downtown 3v3" }, { id: 2, name: "Weekend 5v5" }]);
});

// Get details of a specific game
router.get("/game/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id, name: `Game ${id}`, location: "Basketball Court" });
});

// User Authentication Routes
router.post("/signup", (req, res) => {
  res.json({ message: "Signup route (To be implemented)" });
});

router.post("/login", (req, res) => {
  res.json({ message: "Login route (To be implemented)" });
});

// Private Routes (Require Authentication)
router.get("/profile", (req, res) => {
  res.json({ message: "User Profile (Requires Auth)" });
});

router.post("/create-game", (req, res) => {
  res.json({ message: "Create a Game (Requires Auth)" });
});

router.get("/my-games", (req, res) => {
  res.json({ message: "User's Hosted & Joined Games (Requires Auth)" });
});

router.put("/settings", (req, res) => {
  res.json({ message: "Update User Settings (Requires Auth)" });
});

router.get("/messages", (req, res) => {
  res.json({ message: "User Messages (Requires Auth)" });
});

module.exports = router;
