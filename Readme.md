# pm_uj

#### Master thesis
#### University: Jagiellonian University
#### Student: Jan Boduch

##  Technologies

- Node.js (https://nodejs.org/en/)
- Express (https://expressjs.com)
- React (https://reactjs.org)
- Docker (https://www.docker.com)
- mongoose (https://mongoosejs.com/)
- MongoDB (https://www.mongodb.com/)
- Azure Cloud Database (https://azure.microsoft.com/pl-pl/services/sql-database/)
- Sequelize (https://sequelize.org)
- Tedious (https://www.npmjs.com/package/tedious)
- Axios (https://github.com/axios/axios)
- extendify (https://www.npmjs.com/package/extendify)
- jsonwebtoken (https://www.npmjs.com/package/jsonwebtoken)
- crypto-js (https://www.npmjs.com/package/crypto-js)
- hash.js (https://www.npmjs.com/package/hash.js)
- bcrypt (https://www.npmjs.com/package/bcrypt)
- md5 (https://www.npmjs.com/package/md5)
- cors (https://www.npmjs.com/package/cors)
- email-validator (https://www.npmjs.com/package/email-validator)
- express-form-data (https://www.npmjs.com/package/express-form-data)
- unique-filename (https://www.npmjs.com/package/unique-filename)
- path (https://www.npmjs.com/package/path)
- SendGrid (https://sendgrid.com/)
- @sendgrid/mail (https://www.npmjs.com/package/@sendgrid/mail)
- Bootstrap4 (https://getbootstrap.com)
- SweetAlert2 (https://sweetalert2.github.io/)
- Momentjs(https://momentjs.com)
- Font Awesome(https://fontawesome.com)

## How it looks like?

#### Sign-in
![Sign-in](/screenshots/sign-in.jpg)
#### Register
![Register](/screenshots/register2.jpg)
#### Search
![Search](/screenshots/search.jpg)
#### Add Announcement
![Add Announcement](/screenshots/add-announcement.jpg)
#### Announcement card
![Announcement card](/screenshots/announcement-card.jpg)
#### Message to advertiser
![Message to advertiser](/screenshots/message.jpg)
#### Add to favorites
![Add to favorites](/screenshots/add-to-favorites.jpg)
#### Login guard
![Login guard](/screenshots/login-guard.jpg)
#### Category selector
![Category selector](/screenshots/category-selector.jpg)
#### Subcategory selector
![Subcategory selector](/screenshots/subcategory-selector.jpg)
#### Exception message
![Exception message](/screenshots/exception-message.jpg)
#### Email verify
![Email verify](/screenshots/email-verify.jpg)
#### My Account
![My Account](/screenshots/my-account.jpg)
#### Encrypted database
![Docker Stats](/screenshots/user-db.jpg)
#### Docker Vizualizer
![Docker Vizualizer](/screenshots/docker_vizualizer.jpg)
#### Docker Stats
![Docker Stats](/screenshots/docker-stats.jpg)

## How to use it?

## With Docker Swarm

### Step 1:

There is a config.js file in each microservice. Complete url addresses, access data, passwords, keys.

### Step 2

Complete the connect.js files in: AuthMicroservice, SocialMicroservice, ProductMicroservice.
Relational database is located on the Azure platform (https://azure.microsoft.com/pl-pl/services/sql-database/). At this time, you can query from any IP address, but this will change (0.0.0.0 - 255.255.255.255).

### Step 3

Complete the connect_mongoose.js (Product Database - MongoDB => https://www.mongodb.com/). In directory ProductDatabase_mongoDB you can find a docker-compose.yml file (It contains passwords and account names in the database)

### Step 4*

Use start script:

```
./start.sh
```

#### * You will need Docker and Docker Swarm (https://www.docker.com)


## Without Docker

You will need NPM  => (https://www.npmjs.com) and own mongodb database

### Step 1:

There is a config.js file in each microservice. Complete url addresses, access data, passwords, keys.

### Step 2

Complete the connect.js files in: AuthMicroservice, SocialMicroservice, ProductMicroservice.
Relational database is located on the Azure platform (https://azure.microsoft.com/pl-pl/services/sql-database/). At this time, you can query from any IP address, but this will change (0.0.0.0 - 255.255.255.255).

### Step 3

Complete the connect_mongoose.js (Product Database - MongoDB => https://www.mongodb.com/)

### Step 4

Launch all microservices

#### How to launch Microservice?

1.) Change directory to (MicroserviceName)/App
```
cd MicroserviceName/App
```
2.) Install packages
```
npm install
```
3.) Start microservice
```
npm start
```

