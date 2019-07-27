require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URI, {
  auth: {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  useNewUrlParser: true
}).catch(err => console.log(`ERROR: ${err}`));

const express = require("express");
const app = express();

//Adding cookies and sessions support
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

app.use(cookieParser());
app.use(session({
  secret: (process.env.secret || "random-salt-word"),
  cookie: {
    max: 10800000
  },
  resave: true,
  saveUninitialized: true
}));
//Enabling flash cards
app.use(flash());
app.use((req, res, next) => {
  res.locals.flash = res.locals.flash || {};
  res.locals.flash.success = req.flash("success") || null;
  res.locals.flash.error = req.flash("error") || null;
  next();
});

//Body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Authentication helper
const jwt = require("jsonwebtoken");
const isAuthenticated = (req) => {
  const token = 
    (req.cookies && req.cookies.token) || 
    (req.body && req.body.token) || 
    (req.query && req.query.token) || 
    (req.headers && req.headers["x-access-token"]);

  if (req.session.userId) return true;
  if (!token) return false;

  jew.verify(token, "thisisasecret", function(err, decoded) {
    if (err) return false;
    return true;
  });
};

app.use((req, res, next) => {
  req.isAuthenticated = () => {
    if (!isAuthenticated(req)) 
      return false;
    return true;
  }

  res.locals.isAuthenticated = isAuthenticated(req);
  next();
});

//Routes and paths
const routes = require("./routes.js");
app.use("/api", routes);

//Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = (process.env.PORT || 4000);
app.listen(port, () => console.log(`Listening on ${port}`));