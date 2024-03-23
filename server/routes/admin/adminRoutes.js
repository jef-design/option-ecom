const express = require('express')
const {adminSignUp, adminLogin, adminLogOut, GoogleSignUp, GoogleSignIn  } = require('../../controllers/admin/adminControllers')

const router = express.Router()

router.post('/signup', adminSignUp)
router.post('/oauth/signup', GoogleSignUp)
router.post('/oauth/signin', GoogleSignIn)
router.post('/signin', adminLogin)
router.post('/logout', adminLogOut)

module.exports = router