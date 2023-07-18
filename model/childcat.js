const mongoose = require("mongoose");
const {Schema} = mongoose ;

const childcat_schema = new Schema({
    name:{type:String,require:true,unique:true},
    image:{type:String,require:true,unique:true},
    subcat:{type:Schema.Types.ObjectId,ref:"subcat"},
    created:{type:Date,default:Date.now},
})

const childcat = mongoose.model("Childcat",childcat_schema);
module.exports = childcat;
