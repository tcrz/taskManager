# TaskManager
An app that allows users to manage their tasks. Frontend built with React, Tailwind and Flowbite components.  Backend built with Node/Express and MongoDB.  
<a href="https://taskmanaja.netlify.app" target="_blank">Live demo</a>

## About the project
TaskManager is a simple webapp that allows users to create, update and delete their tasks. 


## Running the App 
1. Firstly, you will need to [clone](https://help.github.com/en/articles/cloning-a-repository) this repository to your machine.
 
### Running the Frontend
1. **Installing Node and NPM**:
   This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (the download includes NPM) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

2. Inside the ```frontend``` directiory run ```npm i``` to install dependencies.

3. **Starting the app**:
    Start the app by running ```npm run dev```. App should now be running at the specified port, access the given port to view the app.  

NB: Since the backend has been hosted, you can fully test out the app by running the frontend alone :)

## Running the Backend 
1. Firstly, you will need to [clone](https://help.github.com/en/articles/cloning-a-repository) this repository to your machine.
 
2. Inside the ```backend``` directiory run ```npm i``` to install dependencies.

3. **Starting the app**:
    Start the app by running ```npm run dev```. App should now be running at the specified port, access the given port to view the app.

NB: You'll need to add your own MongoDB url and JWT secret to the env file provided

The API documentation can be found [here](/backend/README.md)
   
## Thought process and overview 

### User interface
I decided to go with a simple minimalistic design making it easy to use and interact with. To reduce the number of screens, modals were used in order to enhance user experience through out the application

### Data  
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

### State management
The data from the backend is fetched constantly to keep tasks up to date. Which means newly added tasks (or updated or deleted tasks) should reflect immediately after those requests are carried out. To maintain consistency in the frontend as well as backend, operations will only reflect if the API calls were successful, on failure, the user will be  alerted about about what went wrong.

### Authentication and Authorization
For managing the user session, the user token is stored in local storage upon login and used in the authorization header to provide authorization for protected endpoints. On token expiry, users will be logged out and will have to login again.

### Sorting data by given properties
The tasks are being sorted by their properties such as due date, status and priority. Below is a code snippet for the sorting functions.

Code Snippet:
```javascript
const sortByDueDate = (data) => {
  const sortedTasks = [...data].sort((a, b) => Date.parse(b.dueDate) - Date.parse(a.dueDate))
  return sortedTasks
}

const sortByPriority = (data) => {
  const sortedTasks = [
    //retrive all tasks with high priority
    ...[...data].filter(task => task.priority === "high"),
    //retrive all tasks with low (not high) priority
    ...[...data].filter(task => task.priority !== "high")
  ]
  return sortedTasks
}

const sortByStatus = (data) => {
  const sortedTasks = [
    // retrive all tasks with completed status
    ...[...data].filter(task => task.status === "completed"),
    // retrive all tasks with uncompleted (not completed) status
    ...[...data].filter(task => task.status !== "completed")
  ]
  return sortedTasks
}

```

### Possible improvements:
- [ ] Pagination for tasks page to reduce scrolling.  
- [ ] More metrics and graphs on the dashboard.  
- [ ] Email notifications about tasks close to due dates.
