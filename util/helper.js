let bcrypt = require("bcryptjs");
const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();
const jwt = require ("jsonwebtoken");

module.exports={
    encode: (payload)=>{
    return   bcrypt.hashSync(payload);     
    },
    compare:(plainpass,hashpass)=>{
        return bcrypt.compareSync(plainpass, hashpass);
        
    },
    fmsg:async (res,msg="",result=[])=>{
       res.status(200).json({con:"True",msg,result})
    },
    set:async (id,value)=>{
         await client.set(id.toString( ),JSON.stringify(value))
    },
    get:async (id)=>{
         return await client.get(id)
         
    },
    del:async (id)=>{
        await client.drop(id.toString())
    },
    get_token:async (user,private_Key)=>{
        const token = jwt.sign(user,private_Key);
        user.token = token;
        console.log(user)
    }
}