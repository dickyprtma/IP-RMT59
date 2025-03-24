const { Post } = require('../models/index')
function authorization(roles) {
    return async (req, res, next) => {
        try {
            const user = req.user
            if (!roles.includes(user.role)) {
                throw {
                    name: "Forbidden",
                    message: `unauthorized : role must be ${roles}`
                }
            }

            if (user.role === "Staff") {
                const post = await Post.findByPk(req.params.id)
                if (!post) {
                    throw {
                        name: "NotFound",
                        message: "error not found"
                    }
                }

                if (user.id !== post.authorId) {
                    throw {
                        name: "Forbidden",
                        message: "unauthorized : you only can modify your own post"
                    }
                }
            }

            next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = authorization