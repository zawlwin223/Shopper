let mongoose = require ("mongoose");
let {Schema} = mongoose ;
const permit_schema = new Schema({
    name:{type:String,require:true,unique:true},
})
const Permit = mongoose.model("Permit",permit_schema);

module.exports=Permit;