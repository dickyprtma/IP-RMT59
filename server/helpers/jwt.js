const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

function signToken(payload, expiresIn) {
    if (expiresIn) {
        return jwt.sign(payload, secret, { expiresIn: expiresIn })
    } else {
        return jwt.sign(payload, secret)
    }
}

function verifyToken(token) {
    return jwt.verify(token, secret)
}

module.exports = {
    signToken,
    verifyToken
}