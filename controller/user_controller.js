let db = require ("../model/user.js");
let roledb = require ("../model/role.js");
let permitdb = require ("../model/permit.js");
let helper = require ("../util/helper.js");
require ("dotenv").config();

let register = async (req,res,next)=>{
  let email = await db.findOne({email:req.body.email});
  let password = await db.findOne({password:req.body.password});
  if(email){
    new Error(next("Email already in use"));
    return ;
  }
  if(password){
    new Error(next("Password already in use"));
    return ;
  }
  
  req.body.password = helper.encode(req.body.password)
  let result = await new db(req.body).save();
  helper.fmsg(res,"Success",result);
}

let login = async (req,res,next)=>{
  let ph_no = await db.findOne({ph_no:req.body.ph_no}).populate("roles permits").select("-__v");
  if(ph_no){
    if(helper.compare(req.body.password,ph_no.password)){
       let user = ph_no.toObject(); 
       delete user.password;
       
       helper.get_token(user,process.env.SECRET_KEY)
       helper.set(user._id,user);
       helper.fmsg(res,"Success",user)  
       console.log(user._id)
    }else{
       new Error(next("Password Incorrect"))
    }
    
  }else{
       new Error(next("Ph Number incorrect"))
  }
}

let addrole = async (req,res,next)=>{
  
  let user = await db.findById(req.body.user_id)
  let role = await roledb.findById(req.body.role_id)
  let found = user.roles.find(ro=>ro.equals(role._id))
  
  if(found){
    new Error(next("Role already Exists"))
  }else{
    await db.findByIdAndUpdate(user._id,{$push:{roles:role._id}})
  
    let addrole = await db.findById(user._id)
    helper.fmsg(res,"Success",addrole)
  }

  
}

let removerole = async (req,res,next)=>{
  
  let user = await db.findById(req.body.user_id)
  let role = await roledb.findById(req.body.role_id)
  let found = user.roles.find(ro=>ro.equals(role._id))
  
  if(found){
    await db.findByIdAndUpdate(user._id,{$pull:{roles:role._id}})
    helper.fmsg(res,"Role Deleted")
   
  }else{
    new Error(next("Role doesn't Exists"))
  }

  
}

let addPermit = async (req,res,next)=>{
  
  let user = await db.findById(req.body.user_id)
  let permit = await permitdb.findById(req.body.permit_id)
  let found = user.permits.find(ro=>ro.equals(permit._id))
  
  if(found){
    new Error(next("Permit already Exists"))
  }else{
    await db.findByIdAndUpdate(user._id,{$push:{permits:permit._id}})
    let addpermit = await db.findById(user._id)
    helper.fmsg(res,"Success",addpermit)
  }

  
}
let removePermit = async (req,res,next)=>{
  
  let user = await db.findById(req.body.user_id)
  let permit = await permitdb.findById(req.body.permit_id)
  let found = user.permits.find(ro=>ro.equals(permit._id))
  
  if(found){
    await db.findByIdAndUpdate(user._id,{$pull:{permits:permit._id}})
    helper.fmsg(res,"Permit Deleted")
   
  }else{
    new Error(next("Permit doesn't Exists"))
  }

  
}
module.exports = {register,login,addrole,removerole,addPermit,removePermit}