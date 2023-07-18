const mongoose = require ("mongoose")
const {Schema} = mongoose;

const Delivery_Schema = new Schema({
    name:{type:String,require:true},
    price:{type:Number,require:true},
    duration:{type:String,require:true},
    image:{type:String,require:true},
    remark:{type:Array}
})

const Delivery = mongoose.model("Delivery",Delivery_Schema);

module.exports = Delivery;