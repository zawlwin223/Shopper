const message = require("../model/message");
const unread = require("../model/unread_msg")
let helper = require ("./helper")
let live_user = async (socket,user)=>{
    user["socketId"] = socket.id
    helper.set(socket.id,user._id)
    helper.set(user._id,user)
}
let initialize = async (io,socket)=>{
    let user = JSON.parse(socket.user);
    console.log()
    socket["user_id"] = user._id;
   await live_user(socket,user);
   socket.on("message",data=>{
    incomming_message(io,socket,data);
   })
   socket.on("unread",()=>{
    unread_show(socket);
   })
}

let unread_show= async(socket)=>{
    console.log(socket.user_id)
    let unread_msg = await unread.find({to:socket.user_id});
    console.log(unread_msg.length)
    if(unread_msg.length>0){
         unread_msg.forEach(async(val)=>{
            console.log(val._id)
            let del = await unread.findByIdAndDelete(val._id)
              console.log(del)
        })
    }
   socket.emit("unread",unread_msg.length)
}

let incomming_message = async (io,socket,data)=>{
    let save_msg = await new message(data).save();
    let get_msg = await message.findById(save_msg._id).populate("from to","name _id");
    let to_user = await helper.get(get_msg.to._id.toString());
    if(to_user){
        let to_socket_id = JSON.parse(to_user).socketId;
        let to_socket = io.of("/chat").to(to_socket_id);
        if(to_socket){
            to_socket.emit("message",get_msg)
        }else{
            console.log("Socket Error")
        }
       
    }else{
     let unread_data = {from:get_msg.from._id,to:get_msg.to._id}
     let unread_msg = await new unread(unread_data).save();
     console.log("This is unread")
     console.log(unread_msg)
       
    }
    socket.emit("message",get_msg)
}

module.exports = {
    initialize
}