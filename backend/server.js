const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());




const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
})

db.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
  }
  console.log('Connected to MySQL');
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
      if (err) {
        return res.json("Error");
      } 
      return res.json(data);
    })
})
app.post('/login', (req, res) => {

  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";


  db.query(sql, [req.body.email,req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    } 
    if (data.length > 0) {
      return res.json("Success");

    }else {
      return res.json("Failed");
    }
  })
  const [errors, setErrors] = useState({})
})

app.get('/loginData', (req, res) => {
  const sql = "SELECT * FROM login";
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving data from the database' });
    } 
    return res.json(data);
  });
});



app.listen(8081, () =>{
    console.log("listening");
}) 