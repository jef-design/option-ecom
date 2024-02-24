const express = require('express')
const {adminSignUp, adminLogin, adminLogOut  } = require('../../controllers/admin/adminControllers')

const router = express.Router()

router.post('/signup', adminSignUp)
router.post('/signin', adminLogin)
router.post('/logout', adminLogOut)

module.exports = router