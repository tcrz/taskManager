# Task Manager Backend

## Authentication
#### POST '/users/register'
Registration requires email, password and username: 
```
{
  "username": "Diego",
  "email": "diego349@gmail.com",
  "password": "superdiego11"
}
```

Passwords are hashed and stored in db.   
On successful registration, this user's details are returned: 
```
{
  "message": "Registration successful",
  "user": {
    "_id": "642ef320476bf6f25684c06d",
    "username": "Diego",
    "email": "diego349@gmail.com"
  }
}
```

Registering an existing user with the same email will throw an error: 
```
{
  "status_code": 400,
  "title": "Bad request body",
  "message": "Email is already linked to an account"
}
```

#### POST '/users/login'
The login endpoint requires email and password.   
On successful login the token and user details are returned from the server:
```
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0MmZlMjIzMmI4NzNiYzllYzA5MWQ4OSIsInVzZXJuYW1lIjoiQW50b255IiwiZW1haWwiOiJjcnpjdHJsNTc4OUBnbWFpbC5jb20ifSwiaWF0IjoxNjgwODYwNzk0LCJleHAiOjE2ODA4NjA5NzR9.xGVwRhSIJQQbNHcMuegLZr-JPDEurj8SIvvEur1LvWM",
  "user": {
    "username": "Antony",
    "email": "crzctrl5789@gmail.com"
  }
}
```
User session is being verified with a JWT token.  
For unregistered users or invalid details, the server will throw an 401 status code with this response: 
```
{
  "status_code": 401,
  "title": "Unauthorized",
  "message": "Invalid email or password"
}
```

## Task structure overview
The task body consists of title ie name of the task, priority, status and dueDate.
```
{
    title: "complete code assessment",
    priority: "high", // or low
    status: "uncompleted", // or completed
    dueDate: "2/03/2023"
}
```
Fields such as priority and status have specific options:
- priority: "high" or "low"
- status: "completed" or "uncompleted"  

Using other values will throw an error.  
Invalid sample body: 
```
{
  {
  "title": "go to the bank",
  "status": "completed",
  "priority": "urgent",  <---- note the value provided for priority
  "dueDate": "2-22-2023"
  }
}
```
Response:
```
{
  "message": "Task validation failed: priority: `urgent` is not a valid enum value for path `priority`."
}
```
This is to ensure consistency for the ```Task``` body even in the case where the API is accessed directly (ie. without the frontend)
These given fields will also be a means by which we filter tasks.

## Tasks API
** Accessing any of the ```Tasks``` endpoints without authentication will fail:
```
{
  "status_code": 401,
  "title": "Unauthorized",
  "message": "Not authorized"
}
```
### Endpoints
#### GET '/tasks'
Fetches all tasks for the current user  
Response: 
```
{
  "tasks": [
    {
      "_id": "642fe5f8981dcc5df56ecc30",
      "user_id": "642fe2232b873bc9ec091d89",
      "title": "learn express",
      "status": "completed",
      "priority": "low",
      "dueDate": "2023-02-22T00:00:00.000Z",
      "createdAt": "2023-04-07T09:44:24.404Z",
      "updatedAt": "2023-04-07T09:44:24.404Z",
      "__v": 0
    }
  ]
}

```

#### GET '/tasks/:id
Fetches task with given id.  
Response: 
```
{
  "task": {
    "_id": "642fe5f8981dcc5df56ecc30",
    "user_id": "642fe2232b873bc9ec091d89",
    "title": "learn express",
    "status": "completed",
    "priority": "low",
    "dueDate": "2023-02-22T00:00:00.000Z",
    "createdAt": "2023-04-07T09:44:24.404Z",
    "updatedAt": "2023-04-07T09:44:24.404Z",
    "__v": 0
  }
}

```

#### POST '/tasks'
Creates a task
sample body (note that all the fields are required):
```
{
  "title": "learn express",
  "status": "completed",
  "priority": "low",
  "dueDate": "2-22-2023"
}
```
On success, the updated task is returned: 
```
{
  "message": "Task created successfully"
}
```

#### PUT '/tasks/:id'
Updates task with given id.
on success, the updated task is returned: 
```
{
  "message": "Task updated successfully",
  "updatedTask": {
    "_id": "642fe3752b873bc9ec091d8e",
    "user_id": "642fe2232b873bc9ec091d89",
    "title": "go to bank",
    "status": "completed",
    "priority": "high",
    "dueDate": "2023-02-22T00:00:00.000Z",
    "createdAt": "2023-04-07T09:33:41.449Z",
    "updatedAt": "2023-04-07T09:43:33.262Z",
    "__v": 0
  }
}

```

#### DELETE '/tasks/:id'
Deleltes task with given id.  
Response (on success): 
```
{
  "message": "Task deleted succesfully"
}

```
