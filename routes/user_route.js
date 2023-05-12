let router = require ("express").Router();
let user_controller = require ("../controller/user_controller.js");
let {validateBody,validateToken, validateRole} = require ("../util/validate.js")
let {Schema} = require ("../util/schema.js");
const { validate } = require("../model/user.js");

router.post("/register",[validateBody(Schema.userSchema.register),user_controller.register]);
router.post("/login",[validateBody(Schema.userSchema.login),user_controller.login]);
router.post("/addrole",[validateToken(),validateRole("Owner"),validateBody(Schema.userSchema.addRole),user_controller.addrole])
router.post("/removerole",[validateToken(),validateRole("Owner"),validateBody(Schema.userSchema.removeRole),user_controller.removerole])
router.post("/addpermit",[validateToken(),validateRole("Owner"),validateBody(Schema.userSchema.addPermit),user_controller.addPermit])
router.post("/removepermit",[validateToken(),validateRole("Owner"),validateBody(Schema.userSchema.removePermit),user_controller.removePermit])



module.exports = router