var router = require("express").Router();
var itemController = require("../../controllers/itemsController");

router.get("/", itemController.findAll);
router.delete("/:id", itemController.delete);
router.put("/:id", itemController.update);

module.exports = router;
