# Main functionality of the project
We want to create a movie review page where the useres can post and review movies and rate other movies. 
The aim of this project is to make a full stack web application with CRUD functionality. In adittion users can also
consume IMDB API data while using the site. 

# Draw functionality

The wireframe can be found here: https://excalidraw.com/#json=zFswLUQWr5nDm_ZsENZJO,s0hxU3WQ61dMKUL-b_DzKg


## Table example


| Route | HTTP Verb | Description |
| --- | --- | --- |
| "/" | GET | The index will direct you to a landing page where you will see a welcome message and a display of images of the movies using fetch. These images can be slid from one to another but without interaction.
| "/signup" | GET | You will find the mandatory fields to fill out if you wish to create an account, and you will also have an optional box for your profile photo.
| "/signup" | POST | This route allows submitting user data, such as username, email, and password.
| "/login"| GET | This route is used to render the login page where users can enter their login credentials.
| "/login" | POST | This route will post in our database the information of the login user.
| "/logout" | GET | It will enable the rendering of a logout page that provides a farewell message to the user upon logging out.
| "/profile" | GET | This route renders the information of the user profile and the buttons for editing and delete.
| "/profile" | POST | It will send the details of the profile to our database.
| "/profile/delete" | POST | This route will post in our database the information related to whether the user should be deleted.
| "/movies" | GET | It will display a rendering of the page where you will find movies submitted by all users, showing the movie image, title, and other information. Additionally, you will find buttons to access a create a personal review, create and add a review of an existing movie and check your movies.
| "/movies/create" | GET | This route will render a page where you will need to fill out mandatory fields related to information about the movie for which you want to submit a public review. 
| "/movies/create" | POST | The post route allows us to submit the review information to our database.
| "/movies/:userId" | GET | It will render the page containing the movies made by each user in their profile using their respective IDs.
| "/movie/:movieId" | GET | This route renders the page that contains all the information about the movie and also, the buttons for deleting, and giving a score. 
| "/movies/movie/:movieId" | POST | It will post all the details of the form such as a score button, delete or edit.



The project is presented by three full-stack developer students from Ironhack: Erik, Rodrigo, and Oscar. This project was built from scratch.We used Express as the foundational backend framework and Mongoose for modeling and database communication. The project incorporates two models that are equipped with validation and user feedback for invalid submissions.

Furthermore, this website encompasses sign-up, log-in, and log-out functionality, featuring encrypted passwords and/or social logins. We have successfully implemented all CRUD (Create, Read, Update, Delete) actions for models.The project also employs a responsive design to optimize user experience.

## Access to the website: https://popcornmdb.adaptable.app/