const Blog = require("../models/blog.js")

exports.new = (req, res) => {
    req.isAuthenticated();
    res.render("blogs/new", {
        title: "New Blog Post"
    });
};

exports.index = (req, res) => {
    req.isAuthenticated();
    Blog.find({
            author: req.session.userId
        })
        .populate("author")
        .then(blogs => {
            res.render("blogs/index", {
                blogs: blogs,
                title: "Archive"
            })
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            req.flash("error", `ERROR: ${err}`);
            res.redirect("/");
        });
};

exports.show = (req, res) => {
    req.isAuthenticated();
    Blog.findOne({
            _id: req.params.id,
            author: req.session.userId
        })
        .then(blog => {
            res.render("blogs/show", {
                title: blog.title,
                blog: blog
            });
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            req.flash("error", `ERROR: ${err}`);
            res.redirect("/blogs");
        });
};

exports.create = (req, res) => {
    req.isAuthenticated();
    req.body.blog.author = req.session.userId;
    Blog.create(req.body.blog)
        .then(() => {
            req.flash("success", "Your new blog was successfully created.");
            res.redirect("/blogs");
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            req.flash("error", `ERROR: ${err}`);
            res.render("blogs/new", {
                title: "New Blog Post",
                blog: req.body.blog
            });
        });
};

exports.drafts = (req, res) => {
    req.isAuthenticated();
    Blog.find({
            author: req.session.userId
        }).drafts()
        .populate("author")
        .then(drafts => {
            res.render("blogs/index", {
                title: "Drafts",
                blogs: drafts
            })
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            req.flash("error", `ERROR: ${err}`);
            res.redirect("/blogs");
        });
};

exports.published = (req, res) => {
    req.isAuthenticated();
    Blog.find({
            author: req.session.userId
        }).published()
        .populate("author")
        .then(published => {
            res.render("blogs/index", {
                title: "Published",
                blogs: published
            })
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            req.flash("error", `ERROR: ${err}`);
            res.redirect("/blogs");
        });
};

exports.edit = (req, res) => {
    req.isAuthenticated();
    Blog.findOne({
            _id: req.params.id,
            author: req.session.userId
        })
        .then(blog => {
            res.render("blogs/edit", {
                title: `Editing: ${blog.title}`,
                blog: blog
            });
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            req.flash("error", `ERROR: ${err}`);
            res.redirect("/blogs");
        });
};

exports.update = (req, res) => {
    req.isAuthenticated();
    Blog.updateOne({
            _id: req.body.id,
            author: req.session.userId
        }, req.body.blog, {
            runValidators: true
        })
        .then(() => {
            req.flash("success", "Your blog was successfully updated.");
            res.redirect("/blogs");
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            req.flash("error", `ERROR: ${err}`);
            res.render("blogs/edit", {
                title: `Editing: ${req.body.blog.title}`,
                blog: req.body.blog
            });
        });
};

exports.destroy = (req, res) => {
    req.isAuthenticated();
    Blog.deleteOne({
            _id: req.body.id,
            author: req.session.userId
        })
        .then(() => {
            req.flash("success", "The blog was successfully deleted.");
            res.redirect("/blogs");
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
            req.flash("error", `ERROR: ${err}`);
            res.redirect("/blogs");
        });
};