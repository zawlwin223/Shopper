let mongoose = require ("mongoose");
let {Schema} = mongoose ;
const role_schema = new Schema({
    name:{type:String,require:true,unique:true},
    permits:[{type:Schema.Types.ObjectId,ref:"Permit"}]
})
const Role = mongoose.model("Role",role_schema);
module.exports=Role;