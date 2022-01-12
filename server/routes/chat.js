const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");
const chatController = require("../controllers/chat");

const auth = require("../middlewares/auth");

router.get("/", catchErrors(chatController.getAllChats));
router.post("/create", catchErrors(chatController.createChat));
router.get('/:id', catchErrors(chatController.getById))

module.exports = router;