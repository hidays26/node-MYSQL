const item = require("../item/domain")
const user = require("../user/domain")

const router = require("express").Router();
const { checkToken } = require("../../.Auth/token.validation")

router.post("/item/add", item.addItem)
router.get("/item", checkToken, item.getItem)
// router.put("/item/:id", item.controllerUpdateItem)
// router.delete("/item/:id", item.checkToken, item.controllerDeleteItem)
// router.get("/item/:id", checkToken, item.controllerGetItemById)

router.post("/user/add", user.controllerAddUser);
router.post("/user/login", user.controllerLogin);
router.get("/user/",  user.controllerGetUsers);
router.post("/user/:id",  user.controllerGetUsersById);
router.put("/user/:id",  user.controllerUpdateUser);
router.delete("/user/:id",  user.controllerDeleteUser);

module.exports = router;