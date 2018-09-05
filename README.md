# GRAPHQL BACK-END  

Install Node.js sur https://nodejs.org/en/download/ 

Install VisualcodeStudio sur https://code.visualstudio.com/  

Install Git sur https://git-scm.com/downloads

Clone or download github project /

-- Modules installed: express, express-graphql, graphql , bcrypt, asyc, body-parser, express-jwt, graphql-tools, jsonwebtoken, mysql

Install Nodemon (with administrator rights) by :  npm install -g nodemon


Download mysql workbench 

Install ORM sequelize (with administrator rights) : 
  
  1) npm install -g sequelize-cli
  2) npm install --save sequelize@3.30.4
  3) npm install mysql --save
  4) sequelize init

Modify your config.json by writing your db adresse

Create the class  : 

1) sequelize model:create --attributes "email:string name:string surname:string password:string profile:integer" --name User
   sequelize model:create --attributes "name:string" --name Profile
   sequelize model:create --attributes "name:string description:string write:boolean read:boolean" --name Permission
   sequelize model:create --attributes "profile:integer permission:integer" --name rel_profile_permission

2) Create the db

3) Run the command : sequelize db:migrate (if error auth then "alter user 'USER'@'localhost' identified with mysql_native_password by 'PASSWORD'")

4) Go to workbench, database => reverse engineer => Click Execute

5) Run the command : nodemon server.js

6) Go to http://localhost:4000/graphql/users 
   
   a) create a profile: 
   Exemple :
   mutation
    {
      createProfile(name:"Manager")
    }
   
   b) register an user 
   Exemple :
   mutation
    {
  register(surname:"Antoni",name:"Tita",email:"619@test.fr",password:"Tita619",profile:1) {
    id
    }
    }
   
   c) login
   Exemple: 
   mutation
    {
  login(email:"619@test.fr",password:"Tita619")
    }

7) Go to postman or test the query me with login

Others informations:

When you want to modify your db, you can create a migration:
Command line : sequelize migration:create --name modif
and use queryinterface

You can also import your existing database by install sequelize-auto:
npm install -g sequelize-auto
npm install -g mysql
sequelize-auto -o "./models" -d database_name -h ip_server -u username -p port -x password -e mysql
(https://github.com/sequelize/sequelize-auto)

DB admin:
To export a database mysql, command line:
mysqldump -u username -p dbname > dbexport.sql
To import a database mysql, command line:
mysqldump -u username -p dbname < dbexport.sql


  

