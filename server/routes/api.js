const CourseController = require('../controllers/CourseController')
const MaterialController = require('../controllers/MaterialController')
const UserController = require('../controllers/UserController')
const UserCourseController = require('../controllers/UserCourseController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


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

router.post('/romaji-transliterator', async (req, res, next) => {
    try {
        const { romaji } = req.body
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `berikan transliterasi untuk romaji '${romaji}' ke bentuk kanjinya. berikan response hanya kanjinya saja`,
        });
        res.json({
            transliteration: response.text.replace(/\n/g, '')
        })
        console.log(response)
    } catch (error) {
        next(error)
    }
})


module.exports = router