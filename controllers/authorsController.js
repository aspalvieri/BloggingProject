const Author = require("../models/author.js");

exports.create = (req, res) => {
    Author.create(req.body.author)
        .then(() => res.status(200).send({success: "Author created"}))
        .catch(err => res.status(404).send(err));
};