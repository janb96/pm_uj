FROM node:8
WORKDIR /app
COPY App ./
RUN npm install
RUN npm install axios --save
RUN npm install @sendgrid/mail --save
RUN npm install cors --save
cmd ["npm", "start"]
