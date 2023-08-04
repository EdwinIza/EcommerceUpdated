const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const axios = require("axios"); // Import the axios module

// Config .env file
dotenv.config({
  path: path.join(__dirname, `env/${process.env.NODE_ENV}.env`),
});

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router index
const indexRouter = require("./routes/index");
app.use("/", indexRouter);


// Health check
app.get("/", (req, res) => {
  res.status(200).send("Health Check");
});

// Route to fetch cities data based on geonameId
app.get("/api/cities", async (req, res) => {
  try {
    const geonameId = req.query.geonameId;
    const geonamesUsername = "your_geonames_username"; // Replace this with your Geonames username
    const url = `http://api.geonames.org/childrenJSON?geonameId=${geonameId}&username=${geonamesUsername}`;
    const response = await axios.get(url);
    const cities = response.data.geonames;
    res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error.message);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || null;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} using ${ENV} env.`);
});
