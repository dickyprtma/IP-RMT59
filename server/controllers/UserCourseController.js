const { Op } = require('sequelize');
const { User, Course, UserCourse } = require('../models/index');

class UserCourseController {
    // enroll
    static async store(req, res, next) {
        try {
            const { userId, courseId } = req.body;

            if (!courseId) {
                throw {
                    name: "BadRequest",
                    message: "courseId is required"
                }
            }

            const user = await User.findByPk(userId);
            if (!user) {
                throw {
                    name: "NotFound",
                    message: "error not found"
                }
            }

            // if emailVerifiedAt is null, then the user is not verified
            if (!user.emailVerifiedAt) {
                throw {
                    name: "Unauthorized",
                    message: "You need to verify your email first"
                }
            }

            const course = await Course.findByPk(courseId);
            if (!course) {
                throw {
                    name: "NotFound",
                    message: "error not found"
                }
            }

            // if user already enrolled in the course
            const userCourses = await UserCourse.findOne({
                where: {
                    [Op.and]: [{ UserId: userId }, { CourseId: courseId }]
                }
            });
            if (userCourses) {
                throw {
                    name: "BadRequest",
                    message: "You already enrolled in this course"
                }
            }

            const userCourse = await UserCourse.create({
                "UserId": userId,
                "CourseId": courseId

            });
            return res.json(userCourse);
        } catch (error) {
            next(error)
        }
    }

    // unenroll
    static async delete(req, res, next) {
        try {
            const currentUserId = req.user.id;
            const { userId, courseId } = req.body;

            if (!courseId) {
                throw {
                    name: "BadRequest",
                    message: "courseId is required"
                }
            }

            const user = await User.findByPk(userId);
            if (!user) {
                throw {
                    name: "NotFound",
                    message: "error not found"
                }
            }

            const course = await Course.findByPk(courseId);
            if (!course) {
                throw {
                    name: "NotFound",
                    message: "error not found"
                }
            }

            const userCourses = await UserCourse.findOne({
                where: {
                    [Op.and]: [{ UserId: userId }, { CourseId: courseId }]
                }
            });
            if (!userCourses) {
                throw {
                    name: "BadRequest",
                    message: "You are not enrolled in this course"
                }
            }

            // validation if user is unenrolling from a course that is not his/her own
            if (userCourses.UserId !== currentUserId) {
                throw {
                    name: "Unauthorized",
                    message: "You are not authorized to unenroll from this course"
                }
            }

            await UserCourse.destroy({
                where: {
                    [Op.and]: [{ UserId: userId }, { CourseId: courseId }]
                }
            });
            return res.json({ message: "Course unenrolled successfully" });
        } catch (error) {
            next(error);
        }
    }

    static async index(req, res, next) {
        try {
            const user = req.user
            const query = {
                where: {
                    id: user.id
                },
                include: {
                    model: Course
                }
            }
            const userCourses = await User.findOne(
                query
            )
            return res.json(userCourses.Courses);
        } catch (error) {
            next(error);
        }
    }

    // update favorite
    static async updateFavorite(req, res, next) {
        try {
            const { userId, courseId } = req.body

            if (!userId) {
                throw {
                    name: "BadRequest",
                    message: "userId is required"
                }
            }

            if (!courseId) {
                throw {
                    name: "BadRequest",
                    message: "courseId is required"
                }
            }

            const userCourse = await UserCourse.findOne({
                where: {
                    [Op.and]: [{ UserId: userId }, { CourseId: courseId }]
                }
            });

            if (!userCourse) {
                throw {
                    name: "NotFound",
                    message: "error not found"
                }
            }

            // if userCourse favorite is null or false
            if (!userCourse.favorite) {
                await userCourse.update({
                    favorite: true
                });
                return res.json({ message: "Course added to favorite" });
            } else {
                await userCourse.update({
                    favorite: false
                });
                return res.json({ message: "Course removed from favorite" });
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserCourseController;