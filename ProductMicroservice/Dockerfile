FROM node:8
WORKDIR /app
COPY App ./
RUN npm install
RUN npm install sequelize --save
RUN npm install axios --save
RUN npm install mongoose --save
RUN npm install extendify --save
RUN npm install tedious --save
RUN npm install moment --save
RUN npm install cors --save
cmd ["npm", "start"]
