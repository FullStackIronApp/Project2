<!-- # Set Main functionality of the project

# Try to create or draw functionality

# CREATE a TABLE WITH ALL ROUTES NECESSARY -->

## Table example

| Route | HTTP Verb | Description |
| --- | --- | --- |
| "/" | GET | The index will direct you to a landing page where you will see a welcome message and a display of images of the movies using fetch. These images can be slid from one to another, but without interaction.
| "/signup" | GET | You will find the mandatory fields to fill out if you wish to create an account, and you will also have an optional box for your profile photo.
| "/signup" | POST | This route allows to submit the user data, such as username, email, and password.
| "/login"| GET | This route is used to render the login page where users can enter their login credentials.
| "/login" | POST | This route will post in our database the information of the login user.
| "/logout" | GET | It will enable the rendering of a logout page that provides a farewell message to the user upon logging out.
| "/profile" | GET | This route render the information of the user profile and the buttons of edit and delete.
| "/profile" | POST | It will send the details of the profile to our database.
| "/profile/delete" | GET | It will render the profile deletion page, where you will be asked if you are sure about the action you wish to perform. 
| "/profile/delete" | POST | This route will post in our data base the information related to if the user should be deleted or not.
| "/reviews" | GET | It will display a rendering of the page where you will find reviews submitted by all users, showing the movie image, title, and other information. Additionally, you will find the button to access a create a personal review and check your reviews.
| "/reviews/create" | GET | This route will render a page where you will need to fill out mandatory fields related to information about the movie for which you want to submit a public review. 
| "/reviews/create" | POST | The post route allows to submit the review information to our data base.
| "/reviews/:userId" | GET | It will render the page containing the reviews made by each user in their profile using their respective IDs.
| "/reviews/reviewId" | GET | This route render the page that cointain all the information about the review and also, the buttons for editing, deleting, and giving a score.
| "/reviews/reviewId" | POST | It will post all the details of the form such a score button, delete or edit.
| "/reviews/reviewId/edit" | GET | This route render the page where you're be able to edit your owns reviews.
| "/reviews/reviewId/edit" | POST | Allow us to post information to our database regarding the edited reviews.








