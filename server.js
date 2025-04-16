const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blood_bank",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to DB!");
});

// Get all blood data
app.get("/api/blood", (req, res) => {
  db.query("SELECT * FROM blood", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Donate blood
app.post("/api/donate", (req, res) => {
  const { blood_type, quantity } = req.body;
  db.query(
    "UPDATE blood SET quantity = quantity + ? WHERE blood_type = ?",
    [quantity, blood_type],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Donation updated!");
    }
  );
});

// Request blood
app.post("/api/request", (req, res) => {
  const { blood_type, quantity } = req.body;
  db.query(
    "SELECT quantity FROM blood WHERE blood_type = ?",
    [blood_type],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0)
        return res.status(400).send("Invalid blood type.");
      if (results[0].quantity < quantity) {
        return res.status(400).send("Not enough stock.");
      }
      db.query(
        "UPDATE blood SET quantity = quantity - ? WHERE blood_type = ?",
        [quantity, blood_type],
        (err2) => {
          if (err2) return res.status(500).send(err2);
          res.send("Blood issued successfully!");
        }
      );
    }
  );
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
