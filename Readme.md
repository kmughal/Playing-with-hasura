# Introduction

Just playing with hasura. Experimenting JWT auth and performing some basic CRUD ops.

Clone this repository and in order to run this.

- Get Docker setup
- Run docker-compose up -d
- Ruc docker ps -a ( to see if docker is up!)


## Setup hasura:

http://localhost:8080

- Create a table People with three simple fileds : id : int , email : text , name : text, then give permissions
- Now create a Todo table and add two columns id : int , todo : text then give permissions and add a F_Key called owner and reference it from People table

Do it how you use postgresql


Once you have finished with this then Run yarn dev and navigate to http://localhost:3000
