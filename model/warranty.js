const mongoose = require ("mongoose");
const {Schema} = mongoose;

const warranty_Schema = new Schema({
name:{type:String,require:true},
remark:{type:Array,require:true},
image:{type:String,require:true}
});

const warranty = mongoose.model("Warranty",warranty_Schema);

module.exports = warranty;