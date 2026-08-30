const router = require("express").Router()
const controller = require("../controllers/carrito.controller")
router.post("/", controller.recibir)
module.exports = router
