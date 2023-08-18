const express = require('express');
const mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');
// const jwt = require('jsonwebtoken');
const sessions = require('express-session');
const bcrypt = require('bcryptjs');

dotenv.config({ path: './.env' });

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.set('view engine', 'hbs');

db.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log('MySQL Connected...');
    }
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});

// At the time of user registration 
app.post('/authRegister', (req, res) => {
    const { name, email, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM userdb WHERE email = ?', [email], async (error, results) => {
        if(error) {
            console.log(error);
        }
        if(results.length >= 1) {
            return res.render('register', {
                message: 'That email is already in use'
            });
        } else if(password !== passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);

        console.log(hashedPassword);

        db.query('INSERT INTO userDb SET ?', {name: name, email: email, password: hashedPassword}, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'User registered'
                });
            }
        });
    });
});

// At the time of user login 
app.post('/authLogin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).render('login', {
                message: 'Please provide an email and password'
            });
        }

        db.query('SELECT * FROM userDb WHERE email = ?', [email], async (error, results) => {
            // console.log(results);
            if(!results || !(await bcrypt.compare(password, results[0].password))) {
                res.status(401).render('login', {
                    message: 'Email or password is incorrect'
                });
            } else {
                const id = results[0].id;
                console.log('id is = '+results[0].id);
                console.log('name is = '+results[0].name);
                console.log('email is = '+results[0].email);




                // Creating User Session 
                session=req.session;
                session.userId=results[0].id;
                session.userName=results[0].name;
                session.userEmail=results[0].email;
                console.log(req.session)
                res.status(200).redirect('/userDetails');
            }
        });

    } catch (error) {
        console.log(error);
    }
});

// After user login render userDetails page
app.get('/userDetails', (req, res) => {
    session=req.session;
    if(session.userId){
        res.render('userDetails', {name: session.userName, email: session.userEmail});
        
    }else{
        res.redirect('/');
    }
});

// While user click logout button
app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});




app.listen(5000, () => {
    console.log('Server started on Port 5000');
});