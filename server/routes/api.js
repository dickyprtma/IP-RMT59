const CourseController = require('../controllers/CourseController')
const MaterialController = require('../controllers/MaterialController')
const UserController = require('../controllers/UserController')
const UserCourseController = require('../controllers/UserCourseController')
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
router.post('/google-login', UserController.googleLogin)

router.post('/register', UserController.register)
router.get('/verify-email', UserController.verifyEmail);

router.get('/courses', authentication, CourseController.index)
router.get('/courses/:id', authentication, CourseController.show)
router.get('/courses/:courseId/materials', authentication, MaterialController.index)

router.post('/user-courses', authentication, UserCourseController.store)
router.delete('/user-courses', authentication, UserCourseController.delete)
router.get('/user-courses', authentication, UserCourseController.index)
router.patch('/user-courses', authentication, UserCourseController.updateFavorite)



module.exports = router