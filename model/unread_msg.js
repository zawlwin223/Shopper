let mongoose = require("mongoose");
let {Schema} = mongoose;
let unread_schema = new Schema({
    from:{type:Schema.Types.ObjectId,require:true,ref:"User"},
    to:{type:Schema.Types.ObjectId,require:true,ref:"User"},
})
let unread = mongoose.model("Unread_msg",unread_schema);
module.exports=unread;