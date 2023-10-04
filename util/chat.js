let helper=require ("./helper.js")
let liveuser= async (socket_id,user)=>{
    user["socketId"] = socket_id;
    helper.set(socket_id,user._id);
    helper.set(user._id,user);
}

let initialize = async (io,socket)=>{
    socket["user_id"] = socket.user._id;
    liveuser(socket.id,socket.user)
}

module.exports = {initialize};