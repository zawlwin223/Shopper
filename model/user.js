let mongoose = require("mongoose");
let {Schema} = mongoose;

let userSchema = new Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    ph_no:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    roles:[{type:Schema.Types.ObjectId,ref:"Role"}],
    permits:[{type:Schema.Types.ObjectId,ref:"Permit"}],
})

let user = mongoose.model("User",userSchema);
module.exports = user;