const DB = require ("../model/subcat.js")
const catDB = require ("../model/category.js")
const helper = require ("../util/helper.js");

const get = async (req,res,next)=>{
 const result = await DB.find().populate("childcats");
 helper.fmsg(res,"Success",result);
}

const add = async (req,res,next)=>{
    console.log(req.body)
    const name = await DB.findOne({name:req.body.name})
    if(name){
        new Error(next("Name is already in use"))
        
    }else{
        let category = await catDB.findById(req.body.catId);
        if(category){
           
            let result = await new DB(req.body).save();
            await catDB.findByIdAndUpdate(category._id,{$push:{subcate:result._id}});
            helper.fmsg(res,"Success",result)
        }else{
            new Error(next("Category Id is incorrect"));
        }
       
    }
}

const drop = async (req,res,next)=>{
  let subcat = await DB.findById(req.params.id);
  if(subcat){
    await catDB.findByIdAndUpdate(subcat.catId,{$pull:{subcate:subcat._id}})
    await DB.findByIdAndDelete(subcat._id)
    helper.fmsg(res,"Success")
  }else{
    next(new Error("Id is incorrect"))
  }
}

const patch = async (req,res,next)=>{
 let subcat = await DB.findById(req.params.id);
 if(subcat){

   await DB.findByIdAndUpdate(subcat._id,req.body);
   let result = await DB.findById(subcat._id);

  helper.fmsg(res,"Success",result)
 }else{
  next(new Error("Id is incorrect"))
 }
}

module.exports = {get,add,drop,patch}