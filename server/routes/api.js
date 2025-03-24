const UserController = require('../controllers/UserController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(201).json({
        message: "welcome to our api"
    })
})

router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)

router.post('/register', UserController.register)
router.get('/verify-email', UserController.verifyEmail);

module.exports = router