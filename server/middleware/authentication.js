const { verifyToken } = require('../helpers/jwt')
function authentication(req, res, next) {
    try {
        if (!req.headers.authorization) {
            throw {
                name: "Unauthorized",
                message: "unauthenticated : no headers with key authorization"
            }
        }

        const headersAuthorization = req.headers.authorization
        const [type, token] = headersAuthorization.split(" ")

        if (type !== "Bearer" || token === undefined) {
            throw {
                name: "Unauthorized",
                message: "unauthenticated : no bearer token"
            }
        }
        const payload = verifyToken(token)
        req.user = payload
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication