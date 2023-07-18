const DB = require ("../model/tag.js");
const helper =require ("../util/helper.js");

const all = async(req,res,next)=>{
    let result=await DB.find();
    helper.fmsg(res,"Success",result)
}

const post = async(req,res,next)=>{
    let name = await DB.findOne({name:req.body.name});
    if(name){
        next(new Error("Name already in use"))
    }else{
        
        let result =await new DB(req.body).save()
        helper.fmsg(res,"Success",result)
    }
}
const get = async (req,res,next)=>{
    let tag = await DB.findById(req.params.id);
    if(tag){
        helper.fmsg(res,"Success",tag)
    }else{
       new Error(next("Id is incorrect"))
    }
}

const drop = async (req,res,next)=>{
    let tag = await DB.findById(req.params.id);
    if(tag){
       await DB.findByIdAndDelete(tag._id);
       helper.fmsg(res,"Success")
    }else{
       new Error(next("Id is incorrect"))
    }
}

const patch = async (req,res,next)=>{
   
    let tag = await DB.findById(req.params.id);
    if(tag){
       await DB.findByIdAndUpdate(tag._id,req.body);
       let result = await DB.findById(tag._id)
       helper.fmsg(res,"Success",result)
    }else{
       new Error(next("Id is incorrect"))
    }
}

module.exports={all,post,get,drop,patch}