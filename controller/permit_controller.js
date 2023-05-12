let DB = require ("../model/permit.js");
let helper = require ("../util/helper.js");

let all = async (req,res,next)=>{
   let result = await DB.find();
   helper.fmsg(res,"Success",result)
}
let get = async (req,res,next)=>{
    let result = await DB.findById(req.params.id);
    console.log(req.params)
    helper.fmsg(res,"Success",result);
}
let add = async (req,res,next)=>{
    console.log(await helper.get(req.user._id))
    let name = await DB.findOne({name:req.body.name});
    if(name){
       new Error(next("Name Alreay Exists"));
    }else{
        let result = await new DB({name:req.body.name}).save();
        helper.fmsg(res,"Success",result)
    }
}
let patch = async (req,res,next)=>{
    let permit = await DB.findById(req.params.id);
    if(permit){
         await DB.findByIdAndUpdate(permit._id,req.body);
         let result = await DB.findById(permit._id).select("-__v");
         helper.fmsg(res,"Success",result)
    }else{
        new Error(next("Id not found"))
    }
}
let del = async (req,res,next)=>{
    let permit = await DB.findById(req.params.id);
    if(permit){
        await DB.findByIdAndDelete(permit._id);
        helper.fmsg(res,"Deleted")
   }else{
       new Error(next("Id not found"))
   }
}
module.exports = {add,all,get,patch,del}
