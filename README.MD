# Store Front

A command line store front created for node.js implementing a MySQL database.

## Install

- Clone this repo
- run `npm i`

## Using the application

### User Mode

run `node storefrontCustomer.js` or `npm run customer`

### Manager Mode

run `node storefrontManager.js` or `npm run manager`

### Supervisor Mode 

run `node storefrontSupervisor.js` or `npm run manager`

## What I learned

This project was created to showcase using node with sql to develop a application that can use CRUD methodologies against a database. 

Outside of the scope of the project I also wanted to learn more about testing using the node library jest. 

I also built a small function helper that turns the query from mysql into a promise instead of using a callback. This allowed me to clean up my code alot.