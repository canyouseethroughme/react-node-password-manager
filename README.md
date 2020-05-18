# react-node-password-manager
Password manager built with React, NodeJS, Express, JWT and MySQL.

The project contains the client and the server side.
## Server
The server side represents the back-end which is built with Node.js and Express.

In order for the server to run, you need to have installed NodeJS, MySQL and Knex globally.

Steps to follow to setup the project:

1. Log in into your local MySQL DB, using a CLI or any GUI.
2. Create a database for the current project. 
3. Navigate to the /server/config/ and create a file "db_credentials.js" by copying the template and replace the database name, the username and password with your credentials.
4. Open a CLI, navigate to the folder /server/ and run ```npm i```
5. After all the packages are installed, while still in the server folder, run the following commands, in this order:
    ```npm run migrate:rollback``` 
    ```npm run migrate:latest```
    ```npm run seed:run```
6. When all the migrations and seeds completed, you can start the server by running ```npm run start-dev``` and in the terminal the message ```server is listening on port 9090``` should appear.

## Client
The client side represents the front-end and is built with ReactJS.
In your CLI, navigate to the client and run the following commands:
```npm i``` and ```npm run start```.
