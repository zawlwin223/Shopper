const mogoose = require ("mongoose")
const {Schema} = mogoose;

const msg_Schema = new Schema({
    from:{type:Schema.Types.ObjectId,require:true,ref:"User"},
    to:{type:Schema.Types.ObjectId,require:true,ref:"User"},
    type:{type:String,enum:["text","image"]},
    msg:{type:String,require:true}
})
const message = mogoose.model("msg",msg_Schema)
module.exports = message;