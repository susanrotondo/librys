![](client/images/xsm_open_book.png)

# librys
A handy web bookshelf where you can track books you've read!

librys uses the Google Books API to allow users to easily search for books they've read. Books can be stored on their "bookshelf" for easy reference and can also be rated.


## WDI-SM-23 Project 4

librys allows you to track books you've read and rate them for easy reference.

Use the app [Here](https://pacific-hollows-56597.herokuapp.com/)

Or you to install the app, fork the GitHub [repository](https://github.com/susanrotondo/librys") You will then need to:

* Clone the forked repo to your local workspace
* In your local app directory, use npm install to install app dependencies specified in package.json
* Connect your local app to a local (MongoDB) or remote (mLab) database of your own

## Technologies:
* JavaScript
* Node.js
* MongoDB
* Express
* Angular.js
* UI Bootstrap
* HTML
* CSS

### Other:
* Google Books API
* Adobe Illustrator

## User Stories:
#### MVP:
* A user will be able to create an account, log in, and log out.
* A user will be able to search for books by author, title, or portions of title and author.
* A user will be able to add a book found from search result to their list of "Have Read" books.
* Books in the "Have Read" list can be rated by star rating.

#### Wireframes:
<img src="client/images/search_wireframe.png"/>

#### Future Implementations:
* Books in the "Have Read" bookshelf can also be added to the "Favorites" list.
* A user can search for and view the favorites lists of other users to find other books they might be interested in reading.
* A user can add books found by search to their "Want to Read" list. These books can be moved from "Want" to "Have Read" as appropriate.

#### Known Issues:
* Books search form needs to reset after search in the case(s) that no valid book was found for the search terms and/or the user doesn't find a book in the returned results.
* After changing rating for any book, state is reloaded, meaning that even if user had been on "page 4" of bookshelf, view will immediately switch to "page 1"
* Some of the routes need to be adjusted to be RESTful.
* Star rating functionality needs to be refactored. Possibly via a custom directive.
