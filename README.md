<img src="client/images/sm_open_book_icon.png" style="width: 120px;"/>

# librys
A handy web bookshelf where you can track books you've read!


## WDI-SM-23 Project 4

librys allows you to track books you've read and rate them for easy reference.

Access [Here](https://pacific-hollows-56597.herokuapp.com/ )


## User Stories:
#### MVP:
* A user will be able to create an account, log in, and log out.
* A user will be able to search for books by author, title, or portions of title and author.
* A user will be able to add a book found from search result to their list of "Have Read" books.
* Books in the "Have Read" list can be rated by star rating.


#### Future Implementations:
* A user can add books found by search to their "Want to Read" list. These books can be moved from "Want" to "Have Read" as appropriate.
* Books in the "Have Read" bookshelf can also be added to the "Favorites" list.
* A user can search for and view the favorites lists of other users to find other books they might be interested in reading.

#### Wireframes:
<img src="client/images/search_wireframe.png"/>

#### Known Issues:
* Need to put in a nav bar.
* Books search form needs to reset after search in the case(s) that no valid book was found for the search terms and/or the user doesn't find a book in the returned results.
* Some of the routes need to be adjusted to be RESTful.
* Star rating functionality needs to be refactored. Possibly via a custom directive.
