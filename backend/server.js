const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt"); // ✅ import bcrypt

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MomDad321@", // update if needed
  database: "EmployeePortal",
});

// ✅ Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("📥 Request:", req.method, req.url, req.body);
  next();
});

// ✅ Connect to DB
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database");
});

// ✅ Login Route: Username or Email with Password
app.post("/api/login", (req, res) => {
  const { identifier, password } = req.body;
  console.log("Login attempt →", identifier, password);

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing login or password" });
  }

  const query = `
    SELECT * FROM Users 
    WHERE Email = ? OR Username = ?
  `;

  db.query(query, [identifier, identifier], async (err, results) => {
    if (err) {
      console.error("❌ DB Error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Server error: " + err.message });
    }

    if (results.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = results[0];

    // ✅ Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.PasswordHash);
    if (!passwordMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    // ✅ Safe role check + return
    res.json({
      success: true,
      user: {
        username: user.Username,
        email: user.Email,
        role:
          typeof user.Role === "string" ? user.Role.toLowerCase() : "employee",
      },
    });
  });
});

// ✅ Get All Employees
app.get("/api/employees", (req, res) => {
  db.query("SELECT * FROM Employees", (err, results) => {
    if (err) {
      console.error("❌ MySQL Query Error:", err);
      res.status(500).send("Database error");
    } else {
      res.json(results);
    }
  });
});

// ✅ Start Server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
