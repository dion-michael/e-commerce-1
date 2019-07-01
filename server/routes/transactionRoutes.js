const transactionController = require('../controllers/transactionController')
const router = require('express').Router()
const {
    Authenticate,
    Authorize,
    AdminOnly
} = require('../middleware/auth')

router.get('/', Authenticate, transactionController.getAll)
router.patch('/:transactionId', Authenticate, AdminOnly, transactionController.updateStatus)

module.exports = router