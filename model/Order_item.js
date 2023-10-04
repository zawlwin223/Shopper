const mongoose = require ("mongoose");
const {Schema} = mongoose;

const OrderItems_Schema = new Schema({
    order:{type:Schema.Types.ObjectId,ref:"Order",require:true},
    count:{type:Number , default:1},
    product_id:{type:Schema.Types.ObjectId , ref:"Product", require:true},
    name:{type:String,require:true},
    price:{type:Number,require:true},
    status:{type:String , enum:["Accept","Pending","Delivered"] , default:"Accept"},
    created:{type:Date,default:Date.now}
});

const OrderItems = mongoose.model("OrderItems",OrderItems_Schema)

module.exports = OrderItems;