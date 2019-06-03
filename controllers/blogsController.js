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
    Blog.findById(req.params.id)
        .then(blog => {
            res.render("blogs/show", {
                title: blog.title,
                blog: blog
            });
        })
        .catch();
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
    Blog.find().drafts()
        .then(drafts => {
            res.render("blogs/index", {
                title: "Drafts",
                blogs: drafts
            })
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
        });
};

exports.published = (req, res) => {
    Blog.find().published()
        .then(published => {
            res.render("blogs/index", {
                title: "Published",
                blogs: published
            })
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
        });
};

exports.edit = (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => {
            res.render("blogs/edit", {
                title: `Editing: ${blog.title}`,
                blog: blog
            });
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
        });
};

exports.update = (req, res) => {
    Blog.updateOne({
        _id: req.body.id
    }, req.body.blog, {
        runValidators: true
    })
        .then(() => {
            res.redirect("/blogs");
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
        });
};

exports.destroy = (req, res) => {
    Blog.deleteOne({
        _id: req.body.id
    })
        .then(() => {
            res.redirect("/blogs");
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
        });
};