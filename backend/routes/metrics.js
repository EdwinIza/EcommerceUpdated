const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Help Access Metrics
router.post("/help-access", async (req, res) => {
  try {
    const { user_id, timestamp, session_id, metric_type } = req.body;
    // Save the metrics to the help_access_metrics table
    db.query(
      "INSERT INTO help_access_metrics (user_id, timestamp, session_id, metric_type) VALUES (?, ?, ?, ?)",
      [user_id, timestamp, session_id, metric_type],
      (err, result) => {
        if (err) {
          console.error("Error saving help access metrics:", err);
          res.status(500).json({ error: "Failed to save help access metrics" });
        } else {
          res.status(201).json({ message: "Help access metrics saved successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error processing help access metrics:", error);
    res.status(500).json({ error: "Failed to process help access metrics" });
  }
});

// Help Access Metrics - GET
router.get("/help-access", async (req, res) => {
    try {
      // Retrieve all help access metrics from the help_access_metrics table
      db.query("SELECT * FROM help_access_metrics", (err, results) => {
        if (err) {
          console.error("Error fetching help access metrics:", err);
          res.status(500).json({ error: "Failed to fetch help access metrics" });
        } else {
          res.status(200).json(results);
        }
      });
    } catch (error) {
      console.error("Error processing help access metrics:", error);
      res.status(500).json({ error: "Failed to process help access metrics" });
    }
  });

// Page Access Metrics
router.post("/page-access", async (req, res) => {
  try {
    const { user_id, timestamp, session_id, page_name, abandoned } = req.body;
    // Save the metrics to the page_access_metrics table
    db.query(
      "INSERT INTO page_access_metrics (user_id, timestamp, session_id, page_name, abandoned) VALUES (?, ?, ?, ?, ?)",
      [user_id, timestamp, session_id, page_name, abandoned],
      (err, result) => {
        if (err) {
          console.error("Error saving page access metrics:", err);
          res.status(500).json({ error: "Failed to save page access metrics" });
        } else {
          res.status(201).json({ message: "Page access metrics saved successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error processing page access metrics:", error);
    res.status(500).json({ error: "Failed to process page access metrics" });
  }
});

// Page Access Metrics - GET
router.get("/get-page-access", async (req, res) => {
    try {
      // Retrieve all page access metrics from the page_access_metrics table
      db.query("SELECT * FROM page_access_metrics", (err, results) => {
        if (err) {
          console.error("Error fetching page access metrics:", err);
          res.status(500).json({ error: "Failed to fetch page access metrics" });
        } else {
          res.status(200).json(results);
        }
      });
    } catch (error) {
      console.error("Error processing page access metrics:", error);
      res.status(500).json({ error: "Failed to process page access metrics" });
    }
  });

// Error Metrics
router.post("/error", async (req, res) => {
  try {
    const { user_id, timestamp, session_id, error_message } = req.body;
    // Save the metrics to the error_metrics table
    db.query(
      "INSERT INTO error_metrics (user_id, timestamp, session_id, error_message) VALUES (?, ?, ?, ?)",
      [user_id, timestamp, session_id, error_message],
      (err, result) => {
        if (err) {
          console.error("Error saving error metrics:", err);
          res.status(500).json({ error: "Failed to save error metrics" });
        } else {
          res.status(201).json({ message: "Error metrics saved successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error processing error metrics:", error);
    res.status(500).json({ error: "Failed to process error metrics" });
  }
});

// Error Metrics - GET
router.get("/error", async (req, res) => {
    try {
      // Retrieve all error metrics from the error_metrics table
      db.query("SELECT * FROM error_metrics", (err, results) => {
        if (err) {
          console.error("Error fetching error metrics:", err);
          res.status(500).json({ error: "Failed to fetch error metrics" });
        } else {
          res.status(200).json(results);
        }
      });
    } catch (error) {
      console.error("Error processing error metrics:", error);
      res.status(500).json({ error: "Failed to process error metrics" });
    }
  });

// Page Transition Metrics
router.post("/page-transition", async (req, res) => {
  try {
    const { user_id, timestamp, session_id, from_page, to_page, transition_time } = req.body;
    // Save the metrics to the page_transition_metrics table
    db.query(
      "INSERT INTO page_transition_metrics (user_id, timestamp, session_id, from_page, to_page, transition_time) VALUES (?, ?, ?, ?, ?, ?)",
      [user_id, timestamp, session_id, from_page, to_page, transition_time],
      (err, result) => {
        if (err) {
          console.error("Error saving page transition metrics:", err);
          res.status(500).json({ error: "Failed to save page transition metrics" });
        } else {
          res.status(201).json({ message: "Page transition metrics saved successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error processing page transition metrics:", error);
    res.status(500).json({ error: "Failed to process page transition metrics" });
  }
});

// Page Transition Metrics - GET
router.get("/page-transition", async (req, res) => {
    try {
      // Retrieve all page transition metrics from the page_transition_metrics table
      db.query("SELECT * FROM page_transition_metrics", (err, results) => {
        if (err) {
          console.error("Error fetching page transition metrics:", err);
          res.status(500).json({ error: "Failed to fetch page transition metrics" });
        } else {
          res.status(200).json(results);
        }
      });
    } catch (error) {
      console.error("Error processing page transition metrics:", error);
      res.status(500).json({ error: "Failed to process page transition metrics" });
    }
  });

// Transaction Metrics
router.post("/transaction", async (req, res) => {
  try {
    const { user_id, timestamp, transaction_id, transaction_success } = req.body;
    // Save the metrics to the transaction_metrics table
    db.query(
      "INSERT INTO transaction_metrics (user_id, timestamp, transaction_id, transaction_success) VALUES (?, ?, ?, ?)",
      [user_id, timestamp, transaction_id, transaction_success],
      (err, result) => {
        if (err) {
          console.error("Error saving transaction metrics:", err);
          res.status(500).json({ error: "Failed to save transaction metrics" });
        } else {
          res.status(201).json({ message: "Transaction metrics saved successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error processing transaction metrics:", error);
    res.status(500).json({ error: "Failed to process transaction metrics" });
  }
});

// Transaction Metrics - GET
router.get("/transaction", async (req, res) => {
    try {
      // Retrieve all transaction metrics from the transaction_metrics table
      db.query("SELECT * FROM transaction_metrics", (err, results) => {
        if (err) {
          console.error("Error fetching transaction metrics:", err);
          res.status(500).json({ error: "Failed to fetch transaction metrics" });
        } else {
          res.status(200).json(results);
        }
      });
    } catch (error) {
      console.error("Error processing transaction metrics:", error);
      res.status(500).json({ error: "Failed to process transaction metrics" });
    }
  });

module.exports = router;
