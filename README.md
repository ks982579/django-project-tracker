# Django-React Project Tracker

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
* Forgotten Password logic
* Change Password logic in edit profile
* TimeZone logic for tasks.
* bubbling completion date for tasks.
* User Messages system (in the works)
* User to User task assignment.
* Update SignUp data verification/validation (eg strong password)
* Email User when they sign up :)
* Overall Styling via CSS.
* Any other bugs along the way. 

### Completed
* User Sign-up, frontend and backend is OK (12-07-2022)
* User Login logic is OK (14-07-2022)
* Bubbling up percent complete calculation OK (16-07-2022)
* Users now have ability to update Profile OK (21-07-2022)