let mongoose = require('mongoose');

function connectToDb(){
    mongoose.connect('mongodb+srv://kartik:1234@ivy.aq61ire.mongodb.net/ivy?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log("connection sucessful")).catch((err)=>console.log(err));
}
module.exports = connectToDb;