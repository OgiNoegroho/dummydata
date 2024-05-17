//Mencari Dosen Pembimbing mahasiswa Y

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
 
  const query = `
    SELECT D.NIP, D.Nama, D.JenisKelamin
    FROM Dosen D
    INNER JOIN Pendaftaran P ON D.NIP = P.nip_pembimbing1 OR D.NIP = P.nip_pembimbing2
    WHERE P.NIM = '12050120341';
  `;

  database.query(query, (err, results) => {
    if (err) throw err;
    res.json(results); 
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
