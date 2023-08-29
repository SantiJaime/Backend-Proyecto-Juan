const { Router } = require("express")
const { getCartServices, addServiceCart, deleteServiceCart } = require("../controllers/cart")
const auth = require("../middleware/auth")

const router = Router()

router.get("/:id", auth("user"), getCartServices)
router.post("/:idCart/:idServ", auth("user"), addServiceCart)
router.delete("/:idCart/:idServ", auth("user"), deleteServiceCart)

module.exports = router