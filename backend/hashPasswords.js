const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MomDad321@",
  database: "EmployeePortal",
});

db.connect(async (err) => {
  if (err) {
    console.error("❌ DB connection error:", err);
    return;
  }
  console.log("✅ Connected to MySQL");

  db.query("SELECT UserID, PasswordHash FROM Users", async (err, users) => {
    if (err) {
      console.error("❌ Query error:", err);
      return;
    }

    for (const user of users) {
      const { UserID, PasswordHash } = user;

      // Skip if already hashed
      if (PasswordHash.startsWith("$2b$")) {
        console.log(`✅ User ${UserID} already hashed`);
        continue;
      }

      // Hash and update
      const hashed = await bcrypt.hash(PasswordHash, 10);
      db.query(
        "UPDATE Users SET PasswordHash = ? WHERE UserID = ?",
        [hashed, UserID],
        (err) => {
          if (err) {
            console.error(`❌ Error updating user ${UserID}:`, err);
          } else {
            console.log(`🔒 Hashed password for user ${UserID}`);
          }
        }
      );
    }

    console.log("✅ All applicable passwords hashed.");
  });
});
