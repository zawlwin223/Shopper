const router = require ("express").Router();
const Order_Controller = require ("../controller/order_controller.js");
const {validateToken}=require ("../util/validate.js");

router.post("/",validateToken(),Order_Controller.add);
router.get("/",validateToken(),Order_Controller.get)

module.exports = router;