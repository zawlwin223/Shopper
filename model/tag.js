const mongoose = require ("mongoose");
const {Schema} = mongoose;

const tag_schema = new Schema({
    name:{type:String,require:true,unique:true},
    image:{type:String,require:true,unique:true},
    created:{type:Date,default:Date.now}
})

const tag_model = mongoose.model("Tag",tag_schema);
module.exports = tag_model;