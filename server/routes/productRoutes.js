const productController = require('../controllers/productController')
const router = require('express').Router()
const {
    Authenticate,
    AdminOnly
} = require('../middleware/auth')

router.get('/', productController.getAll)
router.post('/', Authenticate, AdminOnly, productController.create)
router.put("/:productId", Authenticate, AdminOnly, productController.update)
router.delete("/:productId", Authenticate, AdminOnly, productController.delete)

module.exports = router