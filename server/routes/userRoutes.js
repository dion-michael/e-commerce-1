const userController = require('../controllers/userController')
const transactionController = require('../controllers/transactionController')
const router = require('express').Router()
const {
    Authenticate,
    Authorize
} = require('../middleware/auth')

router.get('/', Authenticate, userController.getAll)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/checkout', Authenticate, transactionController.create)
router.post('/cart/:productId', Authenticate, userController.addCart)
router.get('/cartDetail', Authenticate, userController.cartDetail)
router.patch('/cart/:productId', Authenticate, userController.removeItem)
router.delete('/cart/:productId', Authenticate, userController.removeCart)
router.get('/transactions', Authenticate, transactionController.getOne)
router.patch('/transactions/:transactionId', Authenticate, Authorize, transactionController.updateStatus)

module.exports = router