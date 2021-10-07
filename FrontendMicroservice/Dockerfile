FROM node:8
WORKDIR /app
COPY App ./
RUN npm install
RUN npm install axios --save
RUN npm install bootstrap --save
RUN npm install sweetalert2 --save
RUN npm install react --save
cmd ["npm", "start"]
