This is the Simple Blood Bank Management System

db.js -> To create database and tables
server.js -> backend or server code
pubic folder has the all frontend code 

Functions
- Display the all Types and Quantity present in the stock
- Donation
  - take inputs of name , address , age(should be greater than 18) and blood type , quantity
  - that quantity will be added to the that perticular blood type
- Request
  - take inputs of name , address , age and blood type , quantity
  - if requested blood type and quantity present in stock
  - that amount of quantity is reduced
  - else alert msg as "Not enough stock"

Backend
single table that stores info of blood types and their quantity
Nodejs , Express , different API to query

Frontend
simple a single web page
designed using only html,css,js (No React)
