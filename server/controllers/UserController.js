const { User } = require('../models/index')
const { comparePassword, hashingPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw {
                    name: "BadRequest",
                    message: "email is required"
                }
            }

            if (!password) {
                throw {
                    name: "BadRequest",
                    message: "password is required"
                }
            }

            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            if (!user) {
                throw {
                    name: "Unauthorized",
                    message: "email or password is invalid"
                }
            }

            const isValidPassword = await comparePassword(password, user.password)
            if (!isValidPassword) {
                throw {
                    name: "Unauthorized",
                    message: "email, or password is invalid"
                }
            }

            const { id } = user
            const bearerToken = await signToken({
                id: id
            })

            res.status(200).json({
                message: `login success`,
                access_token: bearerToken,
                data: {
                    id: id
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async googleLogin(req, res, next) {
        try {

        } catch (error) {

        }
    }

    static async register(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw {
                    name: "BadRequest",
                    message: "email is required"
                }
            }

            if (!password) {
                throw {
                    name: "BadRequest",
                    message: "password is required"
                }
            }

            const newUser = await User.create({
                email: email,
                password: await hashingPassword(password)
            })

            // remove password from response
            delete newUser.dataValues.password

            res.status(201).json({
                message: "register success",
                data: newUser
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController