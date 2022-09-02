const router = require("express").Router();
const userController = require("./../controllers/userController");

router.post("/new-user", userController.createNewUser);
router.post("/login", userController.login);

router.use(userController.protect);
router.patch("/update-user", userController.updateUser);

module.exports = router;
