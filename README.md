# book-maker-archive_Back_NodeJs

  - This is an REST FULL API design for the front side of the project of the same name.
  - This Api is developed in node js and the framework express and is conform of most importantly security system like the hashed of password with "extra salt" and the set up of a JWT Token.
  - It is also important to note that for stacking my data i use mongoDb which is noSQL and schemaless database, which means that I can store my data in a very flexible way.

### notes

for launch the Api on your local machine:
  - run `npm start` to run the scrip who launch the server via `nodemon`.
  - enter `rs` in the terminal to restart the server.


## Api Endpoint

### Book
| URL | Méthode HTTP | Controller | Method | Info |
|--|--|--|--|--|
| `/book` | `GET` | `Book` | `getIndex` | List books |
| `/book/:id` | `GET` | `Book` | `getBook` | One book find by Id |
| `/book/add` | `POST` | `Book` | `postAddBook` | Add book |
| `/book/edit/:id` | `PATCH` | `Book` | `postEditBook` | Edit book by id |
| `/book/delete/:id` | `DELETE` | `Book` | `postDeleteBook` | Delete book by id |
| `/book/liked/:id` | `PATCH` | `Book` | `likeButton` | Allow a user to add a like to a Book |
| `/book/getLikes/:id` | `GET` | `Book` | `getLikes` | Send a number of likes of a specific Book |
| `/book/unlike/:id` | `PATCH` | `Book` | `unlikeBitton` | Allow a user to add a unlike to a Book |
### User
| URL | Méthode HTTP | Controller | Méthode | Info |
|--|--|--|--|--|
| `/auth/signup` | `PUT` | `User` | `postSignup` | Signup route |
| `/auth/login` | `POST` | `User` | `postLogin` | Login route |
### Profile
| URL | Méthode HTTP | Controller | Méthode | Info |
|--|--|--|--|--|
| `/profile/add` | `POST` | `Profile` | `postAddProfile` | Allow a specific user to create a profile linked to his user account |
| `/profile/info/:id` | `GET` | `Profile` | `getProfile` | Show a specific profile |
| `/profile/delete/:id` | `DELETE` | `Profile` | `deleteProfile` | Allow a user to delete his how profile |
| `/profile/edit/:id` | `PATCH` | `Profile` | `editProfile` | Allow a user to edit his how profile |
