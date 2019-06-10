const Author = require("../models/author.js");

exports.new = (req, res) => {
    res.render("authors/new", {
        title: "New Author"
    })
};

exports.create = (req, res) => {
    Author.create(req.body.author)
        .then(() => {
            req.flash("success", "You are now registered.");
            res.redirect("/login");
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            req.flash("error", `ERROR: ${err}`);
            res.redirect("authors/new");
        });
};