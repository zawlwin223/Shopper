const DB = require ("../model/Order.js");
const Order_items_DB = require ("../model/Order_item.js");
const Product_DB = require ("../model/product.js")
const helper = require ("../util/helper.js")
let add = async (req,res,next)=>{
    let user = req.user;
    let items = req.body.items;
    let order_itmes = [];
    let order = new DB;
    let total = 0 ;

    for await(let item of items){
        let product = await Product_DB.findById(item.id);
        let object = {
            order : order._id,
            count : item.count,
            product_id : product._id,
            name : product.name,
            price : product.price,
        }
        total+= product.price*item.count;
        order_itmes.push(object);
    }
    console.log(order_itmes)

    let order_items_result = await Order_items_DB.insertMany(order_itmes);
    let order_items_id = order_items_result.map((val)=>val._id);

    order.user =user._id ;
    order.items = order_items_id;
    order.count =order_itmes.length ;
    order.total =  total;

    let result = await order.save()
    helper.fmsg(res,"Success",result)
}
let get = async (req,res,next)=>{
    console.log(req.user)
    let result = await DB.find({user:req.user._id}).populate("items");
    helper.fmsg(res,"Success",result)
}

module.exports = {add,get} ;