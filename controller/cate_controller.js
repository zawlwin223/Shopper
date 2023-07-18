const DB = require ("../model/category.js")
const helper = require ("../util/helper.js")
const add = async (req,res,next)=>{
   
    let name = await DB.findOne({name:req.body.name});
    if(name){
        new Error(next("Name already exists"));
    }else{
        let result = await new DB(req.body).save()
        helper.fmsg(res,"Success",result)
    }
}
const get = async (req,res,next)=>{
    let result = await DB.find().populate({
        path:"subcate",
        populate:{
            path:"childcats",
            model:"Childcat"
        }
    });
    helper.fmsg(res,"Success",result)
}

const drop = async (req,res,next)=>{
    const data = await DB.findById(req.params.id)
    if(data){
         await DB.findByIdAndDelete(req.params.id)
         helper.fmsg(res,"Success")
        
    }else{
        new Error(next("Id doesnt exist"))
    }
 
    
}

const patch = async (req,res,next)=>{
    const data = await DB.findById(req.params.id);
    if(data){
        const update = await DB.findByIdAndUpdate(req.params.id,req.body);
        helper.fmsg(res,"Success",update)
    }else{
        new Error(next ("Id doesn't exist"))
    }
  
}

module.exports = {add,get,drop,patch}