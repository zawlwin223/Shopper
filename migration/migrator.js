let fs = require ("fs");
let helper=require ("../util/helper.js");
let Db = require ("../model/user.js");
let Role_Db = require ("../model/role.js")
let Permit_Db = require ("../model/permit.js")

let role_permit_migrate = async ()=>{
    let data = await fs.readFileSync(__dirname+"/role_permit.json");
    let data_parse = JSON.parse(data);

    data_parse.Roles.forEach(async(val)=>{
        await Role_Db(val).save()
    })

    data_parse.Permits.forEach(async(val)=>{
        await Permit_Db(val).save()
    })
    
}

let migrate = async ()=>{
    let data =  await fs.readFileSync(__dirname+"/user.json");
    let data_parse = JSON.parse(data);
    data_parse.forEach(async users => {
        users.password =  helper.encode(users.password)
        let result = await new Db(users).save();
        console.log(result)
         });
    
}

let addOwner = async()=>{
    let owner = await Db.findOne({ph_no:"09332100"})
    let role = await Role_Db.findOne({name:"Owner"})
    await Db.findByIdAndUpdate(owner._id,{$push:{roles:role._id}})
    
     
}

let backup = async ()=>{
    let result = await Db.find();
    fs.writeFileSync(__dirname+"/backup/user.json",JSON.stringify(result))
    console.log(result)
}

module.exports = {migrate,backup,role_permit_migrate,addOwner}