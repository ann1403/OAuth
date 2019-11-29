const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    local: {
        login: String,
        pwd: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

const Model = mongoose.model('User', UserSchema);
module.exports = Model;