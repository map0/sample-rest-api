# Main Purpose

- Have unprotected and protected routes
- A user will authenticate by passing in a name and a password and get back a token
- The user will store this token on their client-side and send it for every request
- We will validate this token, and if all is good, pass back information in JSON format

#changelog

##v0.0.9
- integrate Passport strategy for jwt. store hashed pass in users db.

##v0.0.9
- better valdations should be implemented. we use only db validations now

##v0.0.8
- deploy the app, may get some feedback

##v0.0.7
- integrate a VAT service to calculate the price, using this public API - https://jsonvat.com/

##v0.0.6
- create endpoints for Orders and Products. Support list, add/update etc

##v0.0.5
- create Product and Orders models.

##v0.0.4
- Implement authentication via jwt. A request should be send with username and password.
The jwt should be send and validated with each API call. Use mock passwords check

##v0.0.3
- add controllers and exceptions
- add module loader for models and controllers

## v0.0.2
- add router

## v0.0.1
- refactored into more maintainable directory structure.

## v0.0.0
- uses express as microframework
- persist the data