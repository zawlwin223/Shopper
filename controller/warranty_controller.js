const DB = require ("../model/warranty.js");
const helper = require("../util/helper.js");

let all = async (req,res,next)=>{
    let result = await DB.find();
    helper.fmsg(res,"Success",result)
}

let post = async (req,res,next)=>{
    let name = await DB.findOne({name:req.body.name});
    if(name){
        new Error(next("Name is already in use"))
    }else{
        req.body.remark = req.body.remark.split(",")
        let result = await new DB(req.body).save();
        helper.fmsg(res,"Success",result)
    }
}

let get = async (req,res,next)=>{
    let warranty = await DB.findById(req.params.id);
    if(warranty){
        let result = await DB.findById(warranty._id);
        helper.fmsg(res,"Success",result)
    }else{
        new Error(next("Id is incorrect"))
    }
}

let drop = async (req,res,next)=>{
    let warranty = await DB.findById(req.params.id);
    if(warranty){
        await DB.findByIdAndDelete(warranty._id);
        helper.fmsg(res,"Success")
    }else{
        new Error(next("Id is incorrect"))
    }
}

let patch = async (req,res,next)=>{
    let warranty = await DB.findById(req.params.id);
    if(warranty){
        await DB.findByIdAndUpdate(warranty._id,req.body);
        let result = await DB.findById(warranty._id);
        helper.fmsg(res,"Success",result)
    }else{
        new Error(next("Id is incorrect"))
    }
}

module.exports = {all,post,patch,drop,get}