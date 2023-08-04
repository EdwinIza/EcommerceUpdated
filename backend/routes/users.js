const express = require("express");
const router = express.Router();
const db = require("../database/db");
const userController = require("../controllers/userController");

// Get all users
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Error retrieving users" });
    } else {
      res.json(results);
    }
  });
});

// Get user by ID
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  db.query("SELECT * FROM users WHERE user_id = ?", [userId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Error retrieving user" });
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }
  });
});

router.put("/:userId", userController.update_user);

module.exports = router;
