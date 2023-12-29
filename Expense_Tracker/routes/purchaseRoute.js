const express = require('express')

const purchaseController = require('../controllers/purchaseController')

const userAuthentication = require('../middlewares/auth')

const router = express.Router()

router.get('/premiumMembership', userAuthentication, purchaseController.getPremiumMembership)
router.post('/updateTransactionStatus', userAuthentication, purchaseController.updateTransactionStatus)

module.exports = router