const { Course } = require('../models/index')
class CourseController {
    static async show(req, res, next) {
        try {
            const course = await Course.findByPk(req.params.id)

            if (!course) {
                throw {
                    name: "NotFound",
                    message: "error not found"
                }
            }

            res.status(200).json({
                message: "course retrieved successfully",
                data: course
            })

        } catch (error) {
            next(error);
        }
    }
    static async index(req, res, next) {
        try {
            const courses = await Course.findAll()
            res.status(200).json({
                message: "courses retrieved successfully",
                data: courses
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CourseController