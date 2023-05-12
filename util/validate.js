const jwt = require ("jsonwebtoken")
module.exports={
    validateBody:(Schema)=>{
        return (req,res,next)=>{
          
            let result = Schema.validate(req.body);
            if(result.error){
               
                new Error(next(result.error.details[0].message));
               
            }else{
                next();
            }
        }
    },
    validateId:(Schema,id)=>{
        return (req,res,next)=>{
            let obj={};
            obj[`${id}`]=req.params.id;
            let result = Schema.validate(obj);
          if(result.error){
            new Error(next(result.error.details[0].message));
          }else{
            next();
          }
        }
    },
    validateToken:()=>{
        return (req,res,next)=>{
            if(req.headers.authorization){
                let token = req.headers.authorization.split(" ")[1];
                if(token){
                   let decoded = jwt.decode (token,process.env.SECRET_KEY);
                   req.user = decoded;
                   next();
                }else
                {    
                   new Error(next("Need Token"))
                } 
            }
            else{
                new Error(next("Need Token"))
            }
         
         
        }
      
    },
    validateRole:(role)=>{
        return (req,res,next)=>{ 
            let found = req.user.roles.find(user=>user.name == role);
           if(found){
            next()
           }else{
            new Error(next("You Don't Have Permission"))
           }
        }
       
    },


}