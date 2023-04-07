const express = require("express");
const connectDB = require("./config/dbConnection")
const dotenv = require("dotenv").config();
const taskRoutes = require("./routes/tasksRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express()
connectDB()

app.use(express.json())
app.use("/tasks", taskRoutes)
app.use("/users", userRoutes)


app.use(errorHandler)
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})