Capstone
-----


### Introduction

This project is a simple API to simulate a stock exchange.
The model part consists of 5 entities. Of them, Stock, Trader and Market each represents what their name implies.
Market entity can not be directly accessed from API. Possession entity is an association table for many-to-many relationship between
Stock and Trader. Price entity is populated continuously in the background with a job scheduler.
Each stock's opening price is set upon its listing, and its following price is simulated using random walk every 20 seconds.


### Functionality
This API allows all people to view latest price, view latest price on specific exchange and register as trader
This API allows traders to log in and log out, buy and sell stock at its current price.
This API allows administrator to list, modify and unlist a stock.


### File

* app -- the main app
* auth.py -- handle authorization of jwt tokens and communication with Auth0 API
* deployment.sh -- shell commands for deployment to Heroku
* Capstone Case.postman_collection.json -- Postman API testing collection
* manage.py -- heroku database migration
* migrations -- manage database
* models.py -- implement the models
* price_generator.py -- generate new stock price continuously
* Procfile -- deploy gunicorn
* requirements.txt -- required Python packages
* setup.sh -- set environmental variables
* test_app.py -- implement unit testing


### Role and permission

* Admin
    * list:stock
    * modify:stock
    * unlist:stock"
    * Test account: "email":"aaa@gmail.com","password":"A1aaaaaaa"
    * Tested with Postman collection request "Log in Admin"

* Trader
    * trade:stock
    * Test account: "email":"email":"bbb@gmail.com","password":"B2bbbbbbb"
    * Tested with Postman collection request "Log in Trader"

### Heroku deployment

* Base URL: https://rw-stock.herokuapp.com/
