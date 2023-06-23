let router = require ("express").Router();
let role = require ("../controller/role_controller.js");
let {Schema} = require ("../util/schema.js");
let {validateBody,validateId, hasAnyRole} = require ("../util/validate.js");

router.post("/",role.add);
router.get("/",role.all);
router.post("/add/permit",role.add_permit)
router.delete("/delete/permit",role.del_permit)
router.route("/:id")
.get([validateId(Schema.idSchema.id,"id"),role.get])
.patch([validateId(Schema.idSchema.id,"id"),role.patch])
.delete([validateId(Schema.idSchema.id,"id"),role.del])



module.exports = router;