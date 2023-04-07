const express = require("express")
const router = express.Router()
const {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require("../controllers/taskController")
const validateTokenHandler = require("../middleware/validateTokenHandler")

// validateTokenHandler middleware protects routes. 
// routes can only be accessed with a valid token
router.use(validateTokenHandler)
router.route("/")
    .get(getTasks)
    .post(createTask)
router.route("/:id")
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask)


module.exports = router