const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
}

userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) { next(err); return; }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { next(err); return; }
                this.password = hash;
                next();
            });
        })
        return;
    }
    next();
});


const User = mongoose.model('User', userSchema);
module.exports = User;
// ADD VALIDATIONS