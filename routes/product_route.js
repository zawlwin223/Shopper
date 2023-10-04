const router = require ("express").Router();
const product_controller=require ("../controller/product_controller.js");
const {saveMultipleFile}=require ("../util/gallery.js")
router.get("/",product_controller.all)
router.post("/",saveMultipleFile,product_controller.post)

router.route("/paginate/:page")
.get(product_controller.paginate)

router.route("/paginate/:filter/:page/:id")
.get(product_controller.product_filter)

router.route("/:id")
.get(product_controller.get)
.delete(product_controller.drop)
.patch(product_controller.patch)

module.exports = router;