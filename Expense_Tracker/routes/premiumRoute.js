const express = require('express')

const premiumController = require('../controllers/premiumController')

const userAuthentication = require('../middlewares/auth')

const router = express.Router()

// router.get('/expenses', expenseController.getExpenses)
router.get('/showLeaderBoard', userAuthentication, premiumController.getLeaderBoard)

module.exports = router