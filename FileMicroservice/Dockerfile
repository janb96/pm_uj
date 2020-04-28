FROM node:8
WORKDIR /app
COPY App ./
RUN npm install
RUN npm install express-form-data --save
RUN npm install cors --save
RUN npm install path --save
cmd ["npm", "start"]
