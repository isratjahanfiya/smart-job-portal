
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const pool = require("./config/postgres");
const connectMongo = require("./config/mongo");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "SmartCareer Backend Running"
  });
});

// Get All Jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM jobs ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch jobs"
    });
  }
});

// Start Server
async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("PostgreSQL Connected Successfully");

    await connectMongo();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(
        `Backend running at http://localhost:${PORT}`
      );
    });

  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );
    process.exit(1);
  }
}

startServer();
