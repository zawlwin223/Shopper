const router = require ("express").Router();
const tag_controller = require ("../controller/tag_controller.js");
const {saveSingleFile}=require ("../util/gallery.js")
router.get("/",tag_controller.all);
router.post("/",saveSingleFile,tag_controller.post);

router.route("/:id")
.get(tag_controller.get)
.delete(tag_controller.drop)
.patch(tag_controller.patch)
module.exports = router;