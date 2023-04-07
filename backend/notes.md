install express and set up app in server.js
use nodemon to restart sever on changes
youll need dotenv to store variables and secrets(?)
configure your routes in a file
setup mongodb database and collection
connect mongoose to your mongodb via drivers
set up your model schemas

const taskBody = {
    title: "Task",
    priority: "high", // or Low
    status: "uncompleted", // or completed
    dueDate: "2/03/2023"
}
fields for priority and status have specific options
Priority: high or Low
status: completed or uncompleted
using other values will throw an error. this is to ensure consistency for the task body even in the case where API directly without the frontend.

//registration endpoint
registration requires email password and username. passwords are hashed and stored in db. on successful registration this response is returned from the server:
{
  "message": "Registration successful",
  "user": {
    "_id": "642ef320476bf6f25684c06d",
    "username": "Armano",
    "email": "ranmof@gmail.com"
  }
}
registering a another user with the same email will throw an error: 
{
  "status_code": 400,
  "title": "Bad request body",
  "message": "Email is already linked to an account"
}

//login endpoint
login requires email and password. on successful login this response is returned from the server:
{}

for invalid/incorrect details:
{}