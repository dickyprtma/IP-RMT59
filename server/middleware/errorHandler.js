function errorHandler(err, req, res, next) {
    switch (err.name) {
        case "BadRequest":
            return res.status(400).json({
                message: err.message
            })
        case "Unauthorized":
            return res.status(401).json({
                message: err.message
            })
        case "JsonWebTokenError":
            return res.status(401).json({
                message: "token is invalid"
            })
        case "Forbidden":
            return res.status(403).json({
                message: err.message
            })
        case "SequelizeValidationError":
            return res.status(400).json({
                message: err.errors[0].message
            })
        case "SequelizeUniqueConstraintError":
            return res.status(400).json({
                message: err.errors[0].message
            })
        case "NotFound":
            return res.status(404).json({
                message: err.message
            })
        case "SequelizeDatabaseError":
            return res.status(400).json({
                message: err.message
            })
        default:
            res.status(500).json({
                "message": `internal server error: ${err}`
            })
            break
    }
}

module.exports = errorHandler