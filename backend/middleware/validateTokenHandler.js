const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateTokenHandler = asyncHandler(async (req, res, next) => {
    let token;
    // check header for token
    let authHeader = req.headers.Authorization || req.headers.authorization
    // verify token JWT SECRET 
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            // if theres an error then token is invalid
            if (err) {
                res.status(401)
                throw new Error ("Not authorized")
            }
            // else set decoded data to request body and pass it on to the next middleware
            // using next()
            req.user = decoded.user
            next()
        })
    }
    // if no token was found, throw authorization error
    if (!token) {
        res.status(401)
        throw new Error ("Not authorized")
    }
})
module.exports = validateTokenHandler