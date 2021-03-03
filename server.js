/************************************************************************************
* WEB322 – Assignment 3 (Winter 2021)
* I declare that this assignment is my own work in accordance with Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Name: Emre Isik
* Student ID: 137524195
* Course: WEB322NCC
*
************************************************************************************/
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const exphbs = require('express-handlebars');
const url = require('url');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

var HTTP_PORT = process.env.PORT || 8080;

app.use('/static', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

/* ************************ CONFIRMATION *******************************/

const adminEmail = "admin@m.ca";

const user = {
    email: "",
    password: "",
    fname: "",
    lname: ""
};


var sequelize = new Sequelize('db9i6jmb7cnkdq', 'rgttdzkgrkibdo', '2684e4cdd8d0756de49f7714b043fa6feb35df8a01eb1cff1e8e3358e62862c9', {
    host: 'ec2-52-202-66-191.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    }
});

var userTable = sequelize.define('Users', {
    email: Sequelize.STRING,
    fName: Sequelize.STRING,
    lName: Sequelize.STRING,
    psw: Sequelize.STRING,
    bday: Sequelize.STRING
},
{
    indexes: [{
        unique: true,
        fields: ['email']
    }]
});

var itemTable = sequelize.define('Items', {
    filename: Sequelize.STRING,
    title: Sequelize.STRING,
    price: Sequelize.STRING,
    description: Sequelize.STRING,
    city: Sequelize.STRING,
    address: Sequelize.STRING
});


/* ***************************** PAGES and DETAILS  **********************************/

app.get('/', (req, res) => {
    res.render('index', {                
        layout: false,
    });
});
app.get('/register.html', (req, res) => {
    res.render('register', {   
        user: req.session.user,         
        layout: false,                     
    });
});

app.get('/onthemenu.html', function(req,res){
    res.render('onthemenu', { 
        user: req.session.user,        
        layout: false,        
    });
    //res.sendFile(path.join(__dirname, 'listing.hbs'));
});

app.get('/login.html', function(req,res){
    res.render('login', { 
        user: req.session.user,         
        layout: false,        
    });
    //res.sendFile(path.join(__dirname, 'listing.hbs'));
});

app.get("/logout", function (req, res) {
    res.redirect("/login.html");
});

app.post("/register.html", (req, res) => {  

    bcrypt.hash(req.body.psw, 10).then(hash => {

        console.log(hash);  // to print hashed password on console to test

        userTable.create({
            email: req.body.email,
            fName: req.body.firstname,
            lName: req.body.lastname,
            psw: hash,
            bday: req.body.mon + "-" + req.body.day + "-" + req.body.year
        }).then(() => {
            console.log("successfully created a new user");
            res.render("thanks", { ifRegister: true, layout: false });
        }).catch(() => {
            console.log("ERROR: Same email used!");
            res.render("register", { errorMsg: "This email account is already registered!", layout: false });
        });
    })
        .catch(err => {
            console.log(err); // Show any errors that occurred during the process
        }); 
     
});

app.post("/login.html", (req, res) => {   
    userTable.findAll({
        attributes: ['email', 'psw', 'fName', 'lName'],
        where: {
            email: req.body.email
        }
    }).then(function (data) {
        data = data.map(value => value.dataValues);

        console.log("User info from data:");
        console.log(data[0].email);
        console.log(data[0].psw);

        // Assign to use on different pages throughout session duration
        user.email = data[0].email;
        user.password = data[0].psw;
        user.fname = data[0].fName;
        user.lname = data[0].lName;

        // console.log(req.body.email);
        // console.log(req.body.psw);   

        if (req.body.email === "" || req.body.psw === "") {
            return res.render("login", { errorMsg: "Missing credentials.", layout: false });
        }

        bcrypt.compare(req.body.psw, user.password).then((result) => {
            if (req.body.email === user.email && result === true) {

                // Add the user on the session and redirect them to the dashboard page.
                req.session.user = {
                    email: user.email,
                    password: user.password
                };
                res.redirect("/dashboard");
            } else {
                res.render("login", { errorMsg: "invalid username and/or password!", layout: false });
            }
        });

    }).catch(function (e) {
        console.log("ERROR: Undefined email value!");
        res.render("login", { errorMsg: "invalid username and/or password!", layout: false });
    });
     
});


app.get("/dashboard", (req, res) => {    
    itemTable.findAll({
        order: ["id"]
    }).then((data) => {
        data = data.map(value => value.dataValues);
        res.render("dashboard", {
            data: data, 
            layout: false, 
            user: req.session.user,            
            FIRSTNAME: user.fname + " ",
            LASTNAME: user.lname,            
        });
    });      
    
});

app.listen(HTTP_PORT, onHttpStart);