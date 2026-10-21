
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const pool = require("./config/postgres");
const connectMongo = require("./config/mongo");
const authRoutes = require("./routes/auth");
const {
  authenticate,
  authorize
} = require("./middleware/auth");

const app = express();


app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
  ]
}));


app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/api/auth/me", authenticate, (req, res) => {
  res.json({ user: req.user });
});

app.get(
  "/api/student/dashboard",
  authenticate,
  authorize("student"),
  (req, res) => {
    res.json({
      message: "Student dashboard access granted",
      user: req.user
    });
  }
);

app.get(
  "/api/recruiter/dashboard",
  authenticate,
  authorize("recruiter"),
  (req, res) => {
    res.json({
      message: "Recruiter dashboard access granted",
      user: req.user
    });
  }
);

app.get(
  "/api/admin/dashboard",
  authenticate,
  authorize("admin"),
  (req, res) => {
    res.json({
      message: "Admin dashboard access granted",
      user: req.user
    });
  }
);

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
