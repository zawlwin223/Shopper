const DB = require("../model/product");
const helper = require("../util/helper")

let all = async(req,res,next)=>{
    let result=await DB.find();
    helper.fmsg(res,"Success",result)
}

let post = async (req,res,next)=>{
    let name = await DB.findOne({name:req.body.name});
    if(name){
        new Error(next("Name is already in use"));
    }else{
       
        req.body.features = req.body.features.split(",");
        req.body.delivery = req.body.delivery.split(",");
        req.body.warranty = req.body.warranty.split(",");
        req.body.colors   = req.body.colors.split(",");
     
        let result = await new DB(req.body).save();
        helper.fmsg(res,"Success",result)

    }
}

let paginate = async (req,res,next)=>{
    let page_no = req.params.page == 1? Number(req.params.page)-1:Number(req.params.page)-1;
    let limit = process.env.count_limit;
    let skip = page_no*limit;
    let result = await DB.find().skip(skip).limit(limit)
    helper.fmsg(res,`Page No ${req.params.page}`,result)
}

let get = async (req,res,next)=>{
    console.log(req.params.id)
    let product = await DB.findById(req.params.id);
    if(product){
        let result = await DB.findById(product._id);
        helper.fmsg(res,"Success",result)
    }else{
        new Error(next("Id is incorrect"))
    }
}
let drop = async (req,res,next)=>{
    let product = await DB.findById(req.params.id);
    if(product){
        await DB.findByIdAndDelete(product._id);
        helper.fmsg(res,"Success")
    }else{
        new Error(next("Id is incorrect"))
    }
}

let patch = async (req,res,next)=>{
    let product = await DB.findById(req.params.id);
    if(product){
         await DB.findByIdAndUpdate(product._id,req.body);
         let result=await DB.findById(product._id)
        helper.fmsg(res,"Success",result)
    }else{
        new Error(next("Id is incorrect"))
    }
}

let product_filter = async (req,res,next)=>{
    let page_no = req.params.page==1?Number(req.params.page)-1:Number(req.params.page)-1;
    let limit = process.env.count_limit; 
    let skip = page_no*limit;
    let type = req.params.filter;
    let filter_type = "cat";
    switch(type){
        case "cat"      : filter_type = "cat" ; break ; 
        case "tag"      : filter_type = "tag" ; break ; 
        case "subcat"   : filter_type = "subcat" ; break ;
        case "childcat" : filter_type = "childcat" ; break ;
    }
    let filter = new Object();
    filter[`${filter_type}`] = req.params.id;
   
    let result = await DB.find(filter).skip(skip).limit(limit)
    helper.fmsg(res,"Success",result)
}

module.exports={all,post,paginate,get,drop,patch,product_filter}