
# To-Do-List

This is a project designed to manage tasks efficiently. Users can register, log in, and manage their tasks with features like categorization, due dates, and status tracking.


# Features

- ## User Authentication : 
    Secure login and registration using JWT.
- ## Task Management:

    - Add, update, delete, and view tasks.
    - Categorize tasks by work, personal, health, etc.
    - Set due dates for tasks.
    - Mark tasks as completed.


# Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose


# Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` 

`MONGO_URI`

`JWT_SECRET_KEY`

# Start the Application

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


# API Endpoints

#### Authentication

```http
  POST /api/register : Register a new user.
```
```http
  POST /api/login : Login user.
```



#### To-Do Management

```http
  POST /api/todo : Add a new task
```
```http
  GET /api/todo : Get all tasks for the logged-in user.
```
```http
  PUT /api/todo/update/:id : Update a task (mark as completed).
```
```http
  DELETE /api/todo/delete/:id : Delete a task.
```




# 🚀 About Me
I am a full-stack MERN developer with a solid understanding of databases and programming languages like C++ and JavaScript.

## Contact:

- Name : Pranjal Kumar Maurya
- Email : pranjalmaurya003@gmail.com
- Github : https://github.com/PranjalMaurya07
