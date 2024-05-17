//menampilkan semua data mahasiswa yang sudah mendaftar

const express = require("express");
const mysql = require("mysql");
const path = require("path");

const app = express();

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dummydata",
});

database.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get("/test", (req, res) => {
  database.query("SELECT * FROM Pendaftaran", (err, results) => {
    if (err) throw err;
    res.json(results); 
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
