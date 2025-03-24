const { User } = require('../models/index')
const { comparePassword, hashingPassword } = require('../helpers/bcrypt')
const { signToken, verifyToken } = require('../helpers/jwt')
const { verify } = require('jsonwebtoken')
const emailHelper = require('../helpers/emailHelper')

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

            if (!user.emailVerifiedAt) {
                throw {
                    name: "Unauthorized",
                    message: `Please verify your email before logging in`
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
                password: await hashingPassword(password),
                verifiedAt: null
            })

            // Generate verification token
            const verificationToken = signToken({ id: newUser.id }, '1h');
            const verificationLink = `${process.env.BASE_URL}/verify-email?token=${verificationToken}`;

            // Send verification email
            await emailHelper.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: newUser.email,
                subject: 'Verify Your Email',
                html: emailHelper.emailPageTemplate(verificationLink)
            });

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

    static async verifyEmail(req, res, next) {
        try {
            const { token } = req.query;
            // if (!token) throw { name: "BadRequest", message: "Token is required" };
            const decoded = verifyToken(token)
            const user = await User.findByPk(decoded.id);

            if (!user) throw { name: "NotFound", message: "User not found" };
            if (user.emailVerifiedAt) return res.status(200).json({ message: "Email already verified" });

            await User.update(
                { emailVerifiedAt: new Date() },
                { where: { id: user.id } }
            );
            res.status(200).json({ message: "Email verification successful" });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController