require("dotenv").config();
const express = require('express')
const app = express() 
const bodyParser = require("body-parser");
const cors = require('cors')
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const routes = require('./routes/index')
const connect = require('./database/databaseConnection')
const User = require('./models/user')




// Form data parsing
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(cors())

app.set("view engine", "ejs");
// Adding the configured routes to the application.
app.use(session({
    secret: "OuRLITTLESECret.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes)
app.use(express.static( "public"));

// Connecting to the remote Database:
connect.connectDB()

passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
let port = process.env.PORT ;
if(port ==null || port ===""){
    port =3000;
}


app.listen(port, function (req, res) {
    console.log(
        `Server started at port ${port} and running in ${process.env.NODE_ENV} environment.`
    )
})
