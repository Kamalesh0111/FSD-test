import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'kamalesh',
    database : 'user_db'
});

db.connect((err)=>{
    if(err){
        console.log("Error in database connection")
    }
    else{
        console.log("Database connected")
    }
});

const createQuery = `
CREATE TABLE IF NOT EXISTS project(
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(200) NOT NULL,
password VARCHAR(256) NOT NULL
)`

db.query(createQuery,(err)=>{
    if(err){
        console.log("Error in table creation")
    }
    else{
        console.log("table connected")
    }
})
//login
import bcrypt from 'bcryptjs'

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM project WHERE username=?;`

    db.query(query, [username], (err, results) => {
        if (err) {
            res.send({ message: "Error occurred during retrieval of data" + err });
            return;
        }
        if (results.length === 0) {
            res.send({ message: 'No User found' });
            return;
        }

        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (err) {
                res.send({ message: "Error comparing passwords" });
                return;
            }

            if (isMatch) {
                res.send({ message: 'Login successful' });
                return;
            }

            res.send({ message: 'Wrong password' });
        });
    });
});


//sign

app.post('/sign', (req, res) => {
    const { username, password } = req.body;
    const check = `SELECT * FROM project WHERE username=?`;

    db.query(check, [username], (err, results) => {
        if (err) {
            res.send({ message: "Error in insertion of data" });
            return;
        }
        if (results.length !== 0) {
            res.send({ message: "Username already exists" });
            return;
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                res.send({ message: "Error hashing password" });
                return;
            }

            const query = `
                INSERT INTO project(username, password)
                VALUES(?, ?)`;

            db.query(query, [username, hashedPassword], (err) => {
                if (err) {
                    res.send({ message: "Error in insertion of data" });
                    return;
                } else {
                    res.send({ message: "Credentials saved" });
                    return;
                }
            });
        });
    });
});


//form
app.post('/form', (req, res) => {
    const create = `CREATE TABLE IF NOT EXISTS form(
        firstName VARCHAR(200) NOT NULL,
        lastName VARCHAR(200) NOT NULL,
        employeeId VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(12) NOT NULL,
        department VARCHAR(200) NOT NULL,
        dateOfJoining DATE NOT NULL,
        role VARCHAR(200) NOT NULL
    )`;

    // Create the table if it doesn't exist
    db.query(create, (err) => {
        if (err) {
            console.error('Error creating table:', err);
            return res.status(500).send('Error creating table');
        }

        // Now insert the form data into the table
        const { firstName, lastName, employeeId, email, phone, department, dateOfJoining, role } = req.body;

        // Insert the form data into the database
        const insertQuery = `INSERT INTO form (firstName, lastName, employeeId, email, phone, department, dateOfJoining, role) 
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(insertQuery, [firstName, lastName, employeeId, email, phone, department, dateOfJoining, role], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).send('Error inserting data');
            }

            // Send a success response
            res.status(200).send({ message: 'Form data saved successfully!' });
        });
    });
});

app.get('/view', (req, res) => {
    // SQL query to fetch all form data
    const selectQuery = 'SELECT * FROM form';

    db.query(selectQuery, (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            return res.status(500).send('Error retrieving data');
        }

        // Send the fetched data as a JSON response
        res.status(200).json(results);
    });
});



app.listen(5000,()=>{
    console.log("Port runs on http://localhost:5000")
})