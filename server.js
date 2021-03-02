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

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

var HTTP_PORT = process.env.PORT || 8080;

app.use('/static', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}


/* ***************************** PAGES and DETAILS  **********************************/

app.get('/', (req, res) => {
    res.render('index', {        
        layout: false,
    });
});
app.get('/register.html', (req, res) => {
    res.render('register', {        
        layout: false,              
    });
});

app.get('/onthemenu.html', function(req,res){
    res.render('onthemenu', {
        layout: false
    });
    //res.sendFile(path.join(__dirname, 'listing.hbs'));
});

app.get('/login.html', function(req,res){
    res.render('login', {
        layout: false
    });
    //res.sendFile(path.join(__dirname, 'listing.hbs'));
});

app.post("/register.html", (req, res) => {  

    function check(){
        if(req.body.email){
            return true;
        }else{
            return false;
        }
    };  
    res.render('dashboard', {
        check: check(),
        layout: false,
        name: req.body.firstname + " " + req.body.lastname,
        email: req.body.email,
        psw: req.body.psw,
        mon: req.body.mon,
        day: req.body.day,
        year: req.body.year          
    }).catch(() => {
        console.log("ERROR: Same email used!");
        res.render("register", { errorMsg: "This email account is already registered!", layout: false });
    });
        
});



app.post("/login.html", (req, res) => {  
        
        function check(){
            if(req.body.firstname){
                return true;
            }else{
                return false;
            }
        };
        res.render('dashboard', {
            check: check(),
            layout: false,
            name: req.body.firstname + " " + req.body.lastname,
            email: req.body.email,
            psw: req.body.psw,
            mon: req.body.mon,
            day: req.body.day,
            year: req.body.year
        });       
});

app.get("/logout", function (req, res) {
        res.redirect("/login.html");
});

app.post("/dashboard", (req, res) => {
    function check(){
        if(req.body.firstname){
            return true;
        }else{
            return false;
        }
    }
    res.render('dashboard', {
        check: check(),
        layout: false,
        name: req.body.firstname + " " + req.body.lastname,
        email: req.body.email,
        psw: req.body.psw,
        mon: req.body.mon,
        day: req.body.day,
        year: req.body.year
    });       
    //res.send("the first name is " + req.body.firstname + " and the last name is " + req.body.lastname);
});

app.listen(HTTP_PORT, onHttpStart);