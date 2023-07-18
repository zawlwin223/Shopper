const DB = require ("../model/childcat.js")
const subcatDB = require ("../model/subcat.js")
const helper = require ("../util/helper.js")

const all = async(req,res,next)=>{
   let result = await DB.find();
   helper.fmsg(res,"Success",result)
}

const post = async (req,res,next)=>{
    let name = await DB.findOne({name:req.body.name});
    if(name){
        next(new Error("Name is already in use"))
    }else{
        let subcat = await subcatDB.findById(req.body.subcat);
        console.log(subcat)
        if(subcat){
           
            let result=await new DB(req.body).save();
            await subcatDB.findByIdAndUpdate(subcat._id,{$push:{childcats:result._id}})
            helper.fmsg(res,"Success",result)
        }else{
            next(new Error("Subcat Id is incorrect"))
        }
       
    }
}

const patch = async (req,res,next)=>{
    let childcat=await DB.findOne(req.params._id);
    if(childcat){
      await DB.findByIdAndUpdate(childcat._id,req.body)
       let result=await DB.findOne(childcat._id)
       helper.fmsg(res,"Success",result)
    }else{
        next(new Error("Id is incorrect"));
    }
}

const drop = async (req,res,next)=>{
    let childcat = await DB.findOne(req.params._id);
    if(childcat){
        await subcatDB.findByIdAndUpdate(childcat.subcat,{$pull:{childcats:childcat._id}})
        await DB.findByIdAndDelete(childcat._id);
    }else{
        next(new Error("Id is incorrect"))
    }
}

module.exports={all,post,patch,drop}