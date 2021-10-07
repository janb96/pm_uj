FROM node:8
WORKDIR /app
COPY App ./
RUN npm install
RUN npm install sequelize --save
RUN npm install axios --save
RUN npm install bcrypt --save
RUN npm install crypto-js --save
RUN npm install md5 --save
RUN npm install tedious --save
RUN npm install moment --save
RUN npm install cors --save
cmd ["npm", "start"]
