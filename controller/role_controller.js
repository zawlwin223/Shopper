let DB = require ("../model/role.js");
let permitDb = require ("../model/permit.js");
let helper = require ("../util/helper.js");

let add = async (req,res,next)=>{
    let name = await DB.findOne({name:req.body.name});
    if(name){
        new Error(next("Name already exists"))
    }else{
       let result = await new DB(req.body).save();
       helper.fmsg(res,"Success",result);
    }
}

let all = async (req,res,next)=>{
    let result = await DB.find().populate("permits","-__v");
    helper.fmsg(res,"Success",result);
}

let get = async (req,res,next)=>{
    let result = await DB.findById(req.params.id).select("-__v")
   if(result){
    helper.fmsg(res,"Success",result);
   }else{
    new Error(next("Id not found"))
   }
}

let patch = async (req,res,next)=>{
    let role = await DB.findById(req.params.id);
    if(role){
       await DB.findByIdAndUpdate(role._id,req.body)
       let result = await DB.findById(role._id)
       helper.fmsg(res,"Success",result)
    }else{
        new Error(next("Id not found"))
    }
}

let del = async (req,res,next)=>{
    let role = await DB.findById(req.params.id);
    if(role){
        await DB.findByIdAndDelete(role._id);
        helper.fmsg(res,"Deleted")
    }else{
        new Error(next("Id not found"));
    }
}

let add_permit = async (req,res,next)=>{
   let role = await DB.findById(req.body.role);
   let permit = await permitDb.findById(req.body.permit);
   console.log(role,permit)
   if(role && permit){
     await DB.findByIdAndUpdate(role._id,{$push:{permits:permit._id}});
     let result = await DB.findById(role._id);
   
    helper.fmsg(res,"Success",result);
   }
}

let del_permit = async (req,res,next)=>{
    let role = await DB.findById(req.body.role);
    let permit = await permitDb.findById(req.body.permit);
    console.log(role,permit)
    if(role && permit){
      await DB.findByIdAndUpdate(role._id,{$pull:{permits:permit._id}});
      let result = await DB.findById(role._id);
    
     helper.fmsg(res,"Permit Deleted",result);
    }
 }
module.exports={add,all,get,patch,del,add_permit,del_permit}