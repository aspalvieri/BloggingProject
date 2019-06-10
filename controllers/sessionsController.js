const Author = require("../models/author.js");

exports.login = (req, res) => {
    res.render("sessions/login", {
        title: "Login"
    });
};

exports.authenticate = (req, res) => {
    Author.findOne({
        email: req.body.email
    })
        .then(author => {
            if (!author)
                throw new Error("Your credentials don't match.");
            author.authenticate(req.body.password, (err, isMatch) => {
                if (err)
                    throw new Error(err);

                if (isMatch) {
                    req.session.userId = author.id;
                    req.flash("success", "You are now logged in.");
                    res.redirect("/blogs");
                }
                else {
                    req.flash("error", "Your credentials don't match.");
                    res.redirect("/login");
                }
            });
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            req.flash("error", `ERROR: ${err}`);
            res.redirect("/login");
        });
};

exports.logout = (req, res) => {
    req.session.userId = null;
    req.flash("success", "You are now logged out.");
    res.redirect("/");
};