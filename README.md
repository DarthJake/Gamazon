# Gamazon - A webstore

## MVC

MVC stand for Model View Controller. Its is a software design pattern that helps to organize your code.

- Model
    - Data related
    - Getting an manipulating data
    - Communicates with controller
    - Sometimes calls the view
- View
    - What the user sees
    - Often consists of HTML/CSS
    - Communicates with controller
    - Passed dynamic data from the controller
    - Here I am using EJS to accomplish this
- Controller
    - Recieves input from url, view, etc
    - Processes requests
    - Gets data from the model
    - Passes data to the view

## MYSQL
- Command for exporting a database:
`mysqldump -u root -p mydb > "D:\Projects\Programming\Web Based\Node.js\gamazon\export.sql"`