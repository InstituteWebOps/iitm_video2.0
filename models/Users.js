let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

let users = module.exports = mongoose.model('users',userSchema);