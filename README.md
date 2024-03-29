﻿# Django-React Project Tracker

[Writing Markdown](https://www.freecodecamp.org/news/markdown-cheat-sheet/)

### Scope
> (Soon to be...) Complete project tracker web application that allows users 
> to create and track their projects from beginning to end. 

Users can signup or login and create new projects. 
Projects are just tasks without a 'parent_task'.
Projects can have tasks, and tasks can have sub-tasks,
and sub-tasks can have sub-tasks, etc...
Allowing the user to breakdown problems into more manageable chunks.
A helpful version of Divide and Conquer. 

### Not yet complete
Much of the logic is complete, such as sending and storing information in the database,
and rendering tasks in the browser. Some steps not yet completed are:
* bubbling completion date for tasks.
* User Messages system (in the works)
  * CC users
  * delete messages (remove from inbox)
* Adding Team Members as contacts
* User to User task assignment.
* Update SignUp data verification/validation (eg strong password)
* Overall Styling via CSS.
* Any other bugs along the way. 

### Completed
* User Sign-up, frontend and backend is OK (12-07-2022)
* User Login logic is OK (14-07-2022)
* Bubbling up percent complete calculation OK (16-07-2022)
* Users now have ability to update Profile OK (21-07-2022)
* Timezone logic for Tasks OK (01-08-2022)
* Messaging
  * Users can receive messages from each other OK (29-07-2022)
* Basic setup of emailing users OK (02-08-2022)
* Change Password logic in edit profile OK (30-07-2022)
* Sort tasks by date on update in React OK (13-08-2022)
* Email users when they signup OK (13-08-2022)
* Forgotten Password / Password Reset OK (21-08-2022)


---
# Technical Documentation

Below is technical documentation for project

# SignupHandler APIView

The `SignupHandler` APIView is responsible for handling user sign-up requests and creating new user accounts in your application. This view is implemented using Django and Python.

## Endpoint

- URL: `/signup`
- HTTP Method: `POST`

## Request

The `SignupHandler` view expects a JSON payload containing the following information:

| Field      | Type   | Required | Description                   |
|------------|--------|----------|-------------------------------|
| username   | string | Yes      | The desired username for the new user. It should be unique. |
| email      | string | Yes      | The email address of the new user. It should be unique.      |
| password   | string | Yes      | The password for the new user.                               |

Example Request Body:

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "my_password"
}
```

## Response

The `SignupHandler` view returns a JSON response with the following structure:

- Status Code: `201 CREATED` on successful user creation.
- Status Code: `409 CONFLICT` if the provided username or email is already taken.
- Status Code: `500 INTERNAL SERVER ERROR` if there is a server-side error.

Example Response (Success):

```json
{
  "id": 123,
  "username": "john_doe",
  "email": "john@example.com"
}
```

Example Response (Conflict):

```json
{
  "error": true,
  "username_taken": true,
  "email_taken": false
}
```

Example Response (Internal Server Error):

```json
{
  "status": "Server Error"
}
```

## Workflow

1. The view receives a POST request with the user sign-up information.
2. It checks if the provided username or email is already taken by querying the database.
3. If the username or email is taken, it returns a response indicating the conflict.
4. If the username and email are available, a new user account is created in the database.
5. A welcome email is sent to the user's email address.
6. The created user object is serialized and returned in the response.
7. The user is logged in to the application.

## Email Notification

After successful user creation, the `SignupHandler` view sends a welcome email to the new user. The email contains the following information:

- Subject: Welcome to KSullDev's Project Tracker
- Sender: KSullDev's Project Tracker (sender email address)
- Recipient: The email address provided by the user during sign-up

Email Content:

```
Welcome {username},

Thanks for signing up for this Awesome Project Tracker!
We hope that you find it helpful during all of your software development projects.
The project is still a bit of a work-in-progress itself, so don't mind the bugs if you see any.

Please feel free to provide feedback through the appropriate channels not yet provided on the website.

Sincerely,
KSullDev Team
```

---
