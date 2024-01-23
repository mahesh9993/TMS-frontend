## --Next Js Task Management System--
This project is developed to did the basic CRUD operations and user authentication of a Task Management System.

## Build
* Next js 13.4
* TypeScript
* Tailwind css
* Third party dependencies:
    * Axios (npm install axios)
    * headlessUi (npm install @headlessui/react)

## Installation
Requirments:
* Spring boot backend: https://github.com/mahesh9993/TMS-backend.git
* Node js
* Copy the code and run project by npm run dev on the project directory in terminal.
  
## Functionalities
As an admin:
1.	Login to the system.
2.	Admin can access to manage user interface and manage task interface.
3.	Admin can able to create a user by giving a username, password and designation.
4.	Admin can able to delete a user by click the remove button in user list.
5.	Admin can able to only update the user’s designation.
6.	Admin can assign task to a user when creation of the task by giving a task name, user id of assigned employee, priority and the status of the task.
7.	Admin can able to edit task details such as priority and status but cannot assign to the task to another employee(user).
8.	Admin can able to delete a task by click the remove button on task list.

As a user:
1.	User can login to the system by using the username and password which is given by the admin.
2.	User can update the status of the tasks which is assign to them by user.

## Notes
* There is only one admin and admin can manage (CRUD) users and tasks.
* Admin's username must be "SYSTEM" and set any password manually to the admin table at database.
