
const mongoose=require("mongoose")//import mongoose const varible =ruq("mon frompackage.json")

mongoose.connect("mongodb://127.0.0.1:27017/bankServer")//link mongodb



const User=mongoose.model("User",{          //model for collection User(singlur)=in mongodb collectionNAme is users
    acno:Number,
    uname:String,
    psw:String,
    balance:Number,
    transaction:[]

})

//export model
module.exports={
    User
}



