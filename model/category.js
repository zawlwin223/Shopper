const mongoose = require ("mongoose")
const {Schema}= mongoose;

const category_schema = new Schema({
    name:{type:String,required:true,unique:true},
    image:{type:String,required:true,unique:true},
    subcate:[{type:Schema.Types.ObjectId,ref:"Subcat"}],
    created:{type:Date,default:Date.now}
})

let category = mongoose.model("Category",category_schema)
module.exports = category