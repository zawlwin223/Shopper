let router = require ("express").Router();
let warranty_controller=require ("../controller/warranty_controller.js");
router.get("/",warranty_controller.all)
router.post("/",warranty_controller.post)

router.route("/:id")
.get(warranty_controller.get)
.delete(warranty_controller.drop)
.patch(warranty_controller.patch)

module.exports = router;
