require ("dotenv").config();
const express = require ("express"),
app = express(),
mongoose = require ("mongoose"),
fileUpload = require ("express-fileupload");

mongoose.connect(`mongodb://0.0.0.0:27017/${process.env.MONGOOSE}`);

app.use(express.json());
app.use(fileUpload());



let role = require ("./routes/role_route.js");
let permit = require ("./routes/permit_route.js");
let user = require ("./routes/user_route.js");

app.use("/role",role);
app.use("/permit",permit);
app.use("/user",user)

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

app.listen(process.env.PORT,()=>{
    
    console.log(`Server is running at ${process.env.PORT}`);
})
