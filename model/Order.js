const mongoose = require ("mongoose");
const {Schema} = mongoose;

const Order_Schema = new Schema({
    user:{type:Schema.Types.ObjectId , ref:"user" , require:true},
    items:[{type:Schema.Types.ObjectId , ref:"OrderItems",require:true}],
    count:{type:Number,require:true},
    total:{type:Number , require:true},
    created:{type:Date , default:Date.now}
});

const Order = mongoose.model("Order",Order_Schema)

module.exports = Order;