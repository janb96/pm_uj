FROM node:8
WORKDIR /app
COPY App ./
RUN npm install
RUN npm install axios --save
RUN npm install bcrypt --save
RUN npm install crypto-js --save
RUN npm install hash.js --save
RUN npm install md5 --save
RUN npm install cors --save
cmd ["npm", "start"]
