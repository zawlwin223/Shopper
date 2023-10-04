require ("dotenv").config();
const express = require ("express"),
app = express(),
mongoose = require ("mongoose"),
fileUpload = require ("express-fileupload"),
server = require("http").createServer(app),
io = require("socket.io")(server),
jwt = require("jsonwebtoken");
let helper = require("./util/helper");





mongoose.connect(`mongodb://0.0.0.0:27017/${process.env.MONGOOSE}`);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());



let role = require ("./routes/role_route.js");
let permit = require ("./routes/permit_route.js");
let user = require ("./routes/user_route.js");
let cate = require ("./routes/cate_route.js");
let subcat = require ("./routes/subcat_route.js");
let childcat = require ("./routes/childcate_route.js");
let tag = require ("./routes/tag_route.js");
let delivery = require ("./routes/delivery_route.js");
let warranty = require ("./routes/warranty_route.js");
let product = require ("./routes/product_route.js");
let order = require ("./routes/order_route.js");
let { hasAnyRole, validateToken }= require ("./util/validate.js");
const { Socket } = require("socket.io");


app.use("/role",validateToken(),hasAnyRole(["Owner","Manager","Supervisor"]),role);
app.use("/permit",permit);
app.use("/user",user);
app.use("/category",cate);
app.use("/subcategory",subcat);
app.use("/childcategory",childcat);
app.use("/tag",tag);
app.use("/delivery",delivery);
app.use("/warranty",warranty);
app.use("/product",product);
app.use("/order",order)

app.use((err,req,res,next)=>{
    console.log(err.status)
    res.status(500).json({con:"False",msg:err})
});

function defaultdata(){
    let migrate = require("./migration/migrator");
    // migrate.migrate();
    // migrate.backup()
    // migrate.role_permit_migrate()
    // migrate.addOwner()
}
// defaultdata() 

io.of("/chat").use(async(Socket,next)=>{
    let token = Socket.handshake.query.token
    if(token){
        let decoded = jwt.verify(token,process.env.SECRET_KEY)
        if(decoded){
            let get =await helper.get(decoded._id)
            Socket.user = get;
            next();
        }else{
            next(new Error("Tokenization Error"))
        }
    }else{
        next(new Error("Tokenization Error"))
    }
}).on("connection",Socket=>{
    console.log(Socket.user)
})
server.listen(process.env.PORT,()=>{
    console.log("Server is working")
})

