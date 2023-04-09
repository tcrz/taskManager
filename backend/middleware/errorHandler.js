const errors = {
    BAD_REQUEST_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
}

const errorHandler = (err, req, res, next) => {
    console.log(err.message)
    const statusCode = res.statusCode !== undefined ? res.statusCode : 500
    console.log("errhandler", statusCode)
    switch (statusCode) {
        case errors.BAD_REQUEST_ERROR:
            res.json ({
                status_code: statusCode,
                title: "Bad request body",
                message: err.message,
            })
            break;
        case errors.NOT_FOUND:
                res.json ({
                    status_code: statusCode,
                    title: "Not found",
                    message: err.message,
                })
            break;
        case errors.UNAUTHORIZED:
            res.json ({
                status_code: statusCode,
                title: "Unauthorized",
                message: err.message,
            })
        break;
        case errors.FORBIDDEN:
            res.json ({
                status_code: statusCode,
                title: "Forbidden",
                message: err.message,
            })
            break;
        case errors.SERVER_ERROR:
            res.json ({
                status_code: statusCode,
                title: "Server error",
                message: err.message,
            })
            break;
        default:
            res.status(500).json({message: "Sorry, an error occurred"})
            console.log(err.message)
            break;
    }
}

module.exports = errorHandler