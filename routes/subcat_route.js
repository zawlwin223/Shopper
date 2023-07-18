const router = require ("express").Router();
const subcat_controller=require ("../controller/subcat_controller.js");
const  {saveSingleFile}= require ("../util/gallery.js");

router.get("/",subcat_controller.get);
router.post("/",saveSingleFile,subcat_controller.add);

router.route("/:id")
.delete(subcat_controller.drop)
.patch(subcat_controller.patch)







module.exports = router ;