const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//Virtual property for password confirmation
AuthorSchema.virtual("passwordConfirmation")
    .get(() => this.passwordConfirmation)
    .set((value) => this.passwordConfirmation = value);

//Hook operation, called before operation defined occurs, in this case it's 'save'
AuthorSchema.pre("save", function(next) {
    const author = this;

    if (!author.isModified("password"))
        return next();
    
    if (author.password !== author.passwordConfirmation)
        throw new Error("Your passwords don't match!");

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err)
            return next(err);
        
        bcrypt.hash(author.password, salt, (err, hash) => {
            if (err)
                next(err);

            author.password = hash;
            next();
        });
    });
});

//Hash Helper Method, allows comparison between plaintext and hash
AuthorSchema.methods.authenticate = function(plainPassword, callback) {
    //plaintext, hash, callback
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if (err)
            return callback(err);
        
        callback(null, isMatch);
    });
};

module.exports = mongoose.model("Author", AuthorSchema);