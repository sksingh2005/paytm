const { ObjectId } = require("bson")
const mongoose=require("mongoose")
mongoose.connect("mongodb-url")
const userschema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstname:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    }
})
const bankschema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});
const User=mongoose.model('User',userschema);
const Account=mongoose.model('Account',bankschema);
module.exports={
    User,
    Account
}