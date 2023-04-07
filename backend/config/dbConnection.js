const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(`connection establisted with ${connect.connection.name} at ${connect.connection.host}`)
    } catch (err) {
        console.log("connection failed", err)
        process.exit(1)
    }
}

module.exports = connectDB