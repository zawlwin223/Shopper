const mongoose = require ("mongoose")
const {Schema} = mongoose;

const subcat_schema = new Schema({
    name:{type:String,require:true,unique:true},
    image:{type:String,require:true,unique:true},
    childcats:[{type:Schema.Types.ObjectId,ref:"Childcat"}],
    catId:{type:Schema.Types.ObjectId,ref:"category"}
})

const subcat = mongoose.model("Subcat",subcat_schema);
module.exports = subcat;