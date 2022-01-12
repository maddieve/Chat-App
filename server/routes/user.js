const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");

router.post("/logout", userController.logout);
router.put('/update', userController.update);

module.exports = router