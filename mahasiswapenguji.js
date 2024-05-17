//Mencari Mahasiswa Penguji Dosen X

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
    SELECT M.NIM, M.Nama, M.Email, M.JenisKelamin
    FROM Mahasiswa M
    INNER JOIN Pendaftaran P ON M.NIM = P.NIM
    WHERE P.nip_penguji1 = '198612062015031004' OR P.nip_penguji2 = '150331387';
  `;
 
  database.query(query, (err, results) => {
    if (err) throw err;
    res.json(results); 
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
