const Joi = require ("joi");

module.exports={
    Schema:{
        permitSchema:{
            add:Joi.object({
                name:Joi.string().required(),
            })
        },
        idSchema:{
            id:Joi.object({
                id:Joi.string()
                .pattern(new RegExp('^[a-fA-F0-9]{24}$')),
            })
        },
        roleSchema:{
            add_permit:Joi.object({
                 name:Joi.string().pattern(new RegExp('^[a-fA-F0-9]{24}$')),
                    permits:Joi.string().pattern(new RegExp('^[a-fA-F0-9]{24}$'))
            })
        },
        userSchema:{
            register:Joi.object({
                name:Joi.string().required(),
                email:Joi.string().required().email(),
                ph_no:Joi.string().required().min(8).max(11),
                password:Joi.string().required().min(8),
                roles:Joi.string(),
                permits:Joi.string()
            }),
            login:Joi.object({
                ph_no:Joi.string().required().min(8).max(11),
                password:Joi.string().required(),
            }),
           
            addRole:Joi.object({
                    user_id:Joi.string().pattern(new RegExp('^[a-fA-F0-9]{24}$')),
                    role_id:Joi.string().pattern(new RegExp('^[a-fA-F0-9]{24}$'))
                }),

            removeRole:Joi.object({
                    user_id:Joi.string().pattern(new RegExp('^[a-fA-F0-9]{24}$')),
                    role_id:Joi.string().pattern(new RegExp('^[a-fA-F0-9]{24}$'))
                }),
            addPermit:Joi.object({
                    user_id:Joi.string().pattern(new RegExp('^[a-fA-F0-9]{24}$')),
                    permit_id:Joi.string().pattern(new RegExp('^[a-fA-F0-9]{24}$'))
                }),
            removePermit:Joi.object({
                    user_id:Joi.string().pattern(new RegExp('^[a-fA-F0-9]{24}$')),
                    permit_id:Joi.string().pattern(new RegExp('^[a-fA-F0-9]{24}$'))
                }),   
            
        }
    }
    
}