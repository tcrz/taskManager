//Check if all required fields are populated
const validateRequestBody = (body, res) => {
    for (const field in body) {
        if (!body[field]){
            res.status(400)
            throw new Error(`Details incomplete. ${field} is required`)
        }
    }
}

module.exports = validateRequestBody