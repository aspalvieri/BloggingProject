const express = require("express");

const app = express();

const routes = require("./routes.js");
app.use("/", routes);

const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use("/css", express.static("assets/stylesheets"));
app.use("/js", express.static("assets.javascripts"));
app.use("/images", express.static("assets/images"));

const port = (process.env.PORT || 4000);
app.listen(port, () => console.log(`Listening on ${port}`));