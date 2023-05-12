let router = require ("express").Router();
let permit = require ("../controller/permit_controller.js");
let {Schema} = require ("../util/schema.js");
let {validateBody,validateId,validateToken} = require ("../util/validate.js");

router.post("/",[validateToken(),validateBody(Schema.permitSchema.add),permit.add]);
router.get("/",permit.all);

router.route("/:id")
.get([validateId(Schema.idSchema.id,"id"),permit.get])
.patch([validateId(Schema.idSchema.id,"id"),permit.patch])
.delete([validateId(Schema.idSchema.id,"id"),permit.del])

module.exports = router;