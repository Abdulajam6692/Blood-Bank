const mysql = require("mysql2");

// Initial connection (without specifying DB)
const initialConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Add your MySQL password if set
  multipleStatements: true,
});

const initSQL = `
  CREATE DATABASE IF NOT EXISTS blood_bank;
  USE blood_bank;
  CREATE TABLE IF NOT EXISTS blood (
    blood_type VARCHAR(5) PRIMARY KEY,
    quantity INT DEFAULT 0
  );
  INSERT INTO blood (blood_type, quantity) VALUES
    ('A+', 5),
    ('A-', 3),
    ('B+', 4),
    ('B-', 2),
    ('O+', 6),
    ('O-', 3),
    ('AB+', 2),
    ('AB-', 1)
  ON DUPLICATE KEY UPDATE quantity = VALUES(quantity);
`;

initialConnection.query(initSQL, (err, results) => {
  if (err) {
    console.error("❌ Error initializing database:", err);
    return;
  }
  console.log("✅ Database and table initialized successfully.");
});

// Export proper connection (after DB exists)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blood_bank",
});

module.exports = db;
