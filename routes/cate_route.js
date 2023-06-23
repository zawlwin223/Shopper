const router = require ("express").Router();
const cate = require ("../controller/cate_controller.js");
const {saveSingleFile}= require("../util/gallery")
router.post("/",saveSingleFile,cate.add);
router.get("/",cate.get)
router.route("/:id")
.delete(cate.drop)
.patch(saveSingleFile,cate.patch)
module.exports = router;