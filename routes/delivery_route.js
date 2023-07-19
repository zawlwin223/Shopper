const router = require ("express").Router();
const delivery_controller=require("../controller/delivery_controller");

router.get("/",delivery_controller.all);
router.post("/",delivery_controller.post);

router.route("/:id")
.get(delivery_controller.get)
.delete(delivery_controller.drop)
.patch(delivery_controller.patch)

module.exports = router;