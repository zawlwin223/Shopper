const mongoose = require ("mongoose");
const {Schema} = mongoose;

const product_schema = new Schema({
    name:{type:String,require:true,unique:true},
    price:{type:Number,require:true},
    brand:{type:String,require:true},
    cat:{type:Schema.Types.ObjectId,ref:"Category"},
    subcat:{type:Schema.Types.ObjectId,ref:"Subcat"},
    childcat:{type:Schema.Types.ObjectId,ref:"Childcat"},
    tag:{type:Schema.Types.ObjectId,ref:"Tag"},
    discount:{type:Number,default:0},
    features:{type:Array,require:true},
    desc:{type:String,require:true},
    detail:{type:String,require:true},
    status:{type:Boolean,default:true},
    delivery:[{type:Schema.Types.ObjectId,ref:"Delivery"}],
    warranty:[{type:Schema.Types.ObjectId,ref:"Warranty"}],
    colors:{type:Array,require:true},
    size:{type:String,require:true},
    rating:{type:String,default:0},
    images:{type:Array,require:true},
    created:{type:Date,default:Date.now}
});

const product = mongoose.model("Product",product_schema);

module.exports = product;