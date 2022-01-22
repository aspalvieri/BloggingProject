// Our dotenv
require("dotenv").config();

// Connecting to MongoDB cluster with Mongoose
const mongoose = require("mongoose");
mongoose.connect(`${process.env.DB_TYPE}//${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => console.log(`ERROR: ${err}`));

// Our imported libraries
const express = require("express");

// Assigning Express to an app contstant
const app = express();

// Adding cookie and session support to our application
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
app.use(cookieParser());
app.use(
  session({
    secret: process.env.secret || "boorakacha",
    cookie: {
      maxAge: 10800000
    },
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());
app.use((req, res, next) => {
  debugger;
  res.locals.flash = res.locals.flash || {};
  res.locals.flash.success = req.flash("success") || null;
  res.locals.flash.error = req.flash("error") || null;

  next();
});

// Our authentication helper
const jwt = require("jsonwebtoken");
const isAuthenticated = req => {
  const token =
    (req.cookies && req.cookies.token) ||
    (req.body && req.body.token) ||
    (req.query && req.query.token) ||
    (req.headers && req.headers["x-access-token"]);

  if (req.session.userId) return true;
  if (!token) return false;

  jwt.verify(token, "bobthebuilder", function(err, decoded) {
    if (err) return false;
    return true;
  });
};

app.use((req, res, next) => {
  req.isAuthenticated = () => {
    if (!isAuthenticated(req)) return false;

    return true;
  };

  res.locals.isAuthenticated = isAuthenticated(req);
  next();
});
// End of our authentication helper

// This maintains our home path
const path = require("path");

// Body parser which will make reading request bodies MUCH easier
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Our routes
const routes = require("./routes.js");
app.use("/api", routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Starting our server on port 4000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});