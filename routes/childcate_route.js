const router = require ("express").Router();
const childcat_controller = require ("../controller/childcat_controller.js");
const {saveSingleFile}=require ("../util/gallery.js")

router.get("/",childcat_controller.all);
router.post("/",saveSingleFile,childcat_controller.post);

router.route("/:id")
.patch(saveSingleFile,childcat_controller.patch)
.delete(childcat_controller.drop)

module.exports = router;