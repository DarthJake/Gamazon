# Gamazon - A webstore

***This readme is mostly just a big giant node to my future self.*** So keep that in mind if your not me and reading it. I will however put a little more effort into it just in case someone does decide to read it. Also for practice at making half decent documentation. Not that this is really documentation. It's more of a documentation of my choices.

## Overview

This was a project to make a small little webstore. I decided on the name Gamazon in about 2 seconds and yes. It is a stupid name. But it's really not important. Good names and looks are most certainly not what I'm going for here. The goal of a webstore was really the only starting point, but there were a couple of things I knew I wanted:

- User accounts
- Carts for each user
- A way for venders to add products

After that I had to decide what my tech stack was going to be. I decided on:

- MYSQL
- NODE.JS
- Node Plugin: EJS (Embedded JavaScript Templating)

With these three I have my database, frontend, and backend chosen. There are a couple more node.js plugins that I used but you can see those in the `package.json` file.

## MVC

MVC stand for Model View Controller. It is a software design pattern that helps to organize your code. I am going to use it in this project mainly to get some experience with it.

![MVC Diagram](public\assets\mvc_diagram_with_routes.png)

- Model
  - Data related
  - Getting data
  - Communicates with controller
- View
  - What the user sees
  - Consists HTML/CSS
  - Communicates with controller
  - Passed dynamic data from the controller
  - Here I am using EJS to accomplish this
- Controller
  - Receives input from url, view, etc
  - Processes requests
  - Gets data from the model
  - Passes data to the view

  Every Page has a Controller and View associated with it. But only pages that require access to the database have a Model.

  Something else to note. In the above diagram (which I very conveniently found online; I'm not that good of an artist) you'll notice that it mentions a router. I also use a router and I actually have it in its own js file. It works *nearly* exactly as it is shown in the diagram. The main difference is that based upon the route requested, the router will call the controller associated with that route.

## MYSQL

For my database I'm using MYSQL. Theres no particular reason I chose this one besides to learn about it. I have a dump of it saved as `export.sql`. If you want to try and run the server you will need to [install mysql](https://dev.mysql.com/doc/refman/8.0/en/windows-installation.html) before running these commands. Also make sure to set a environment variable to the bin folder of the mysql server folder. Also you'll have to make sure all the stuff for the database like the login, port, etc. lines up with the stuff in the `database.js` file.

- Command for exporting a database:

  - `mysqldump -u user_name -p database_name > ".\export.sql"`

- Command for importing a database:

  - `mysql -u user_name -p database_name < ".\export.sql"`

## NODE.JS

I chose NODE.JS simply because it was the first thing I found that could do what I needed, it was popular, and I didn't know how to use it. So it was a good learning opportunity.

## EJS

Ok. This is really cool. I didn't know this was even a thing. I get to render HTML files using code (javascript) in way that allows me to make dynamic web pages. This is really cool. To me at least. It's easily installable through npm (which I also used here for all the packages) but here is a link for [ejs](https://ejs.co/).

## Final Thoughts

### How I handle the modules

The way the MVC is setup, every page has its own Controller and Module. This works well for the controllers. But for the modules, it seems almost a waste because they are just files with functions to send different queries to the database. There is a lot of overlap for some of the functions and it seems like it might have been a better idea just to have one module file and have all the controllers route through that. Seems like that would have been a bit tidier.

### Depth of the Project

In hindsight, the project (or at least the way I've implemented it) doesn't really go into depth with the tools I have used. Almost every part of NODE.JS and MYSQL I have used are fairly high level so a big part of this project was simply introducing myself to these tools, which honestly was the main goal. So I say, mission accomplished.

### Things I Skipped Over

There were a couple of things I had absolutely no regard for in this project. A big one is security. I'm almost certain I am wide open to things like MYSQL injection and whatever else. My user's passwords are stored in plaintext. I also have no optimization in place for things in my database. I'm not sure if that would every become a problem but its just an example. Like I said previously. This project was just a self introduction to these tools for myself, so I purposefully skipped over these things. And I'm certain there are more things I haven't even thought of. But I'll get around to learning them. Either in a future project or I'll figure it out when I need it.
