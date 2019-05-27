const Blog = require("../models/blog.js")

exports.new = (req, res) => {
    res.render("blogs/new", {
        title: "New Blog Post"
    });
};

exports.index = (req, res) => {
    Blog.find()
        .then(blogs => {
            res.render("blogs/index", {
                blogs: blogs,
                title: "Archive"
            })
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
        });
};

exports.show = (req, res) => {

};

exports.create = (req, res) => {
    Blog.create(req.body.blog)
        .then(() => {
            res.redirect("/blogs");
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
        });
};

exports.drafts = (req, res) => {

};

exports.published = (req, res) => {

};