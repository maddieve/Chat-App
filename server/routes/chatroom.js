const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");
const chatroomController = require("../controllers/chatroomController");

const auth = require("../middlewares/auth");

router.get("/", catchErrors(chatroomController.getAllChatrooms));
router.post("/create", chatroomController.createChatroom);
router.get('/:id', catchErrors(chatroomController.getById))

module.exports = router;