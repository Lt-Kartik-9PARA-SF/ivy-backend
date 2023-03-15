let mongoose = require('mongoose');

let Register = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
    },
    mobile:Number,
    password:String
});

let User = mongoose.model('userProfile',Register);

module.exports = User;