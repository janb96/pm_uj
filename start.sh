!/usr/bin/env bash
echo -e $"Start MongoDB and Mongo-Express (docker-compose up)"
cd ProductDatabase_mongoDB
sudo docker-compose up -d
cd ..
echo -e $"Docker Swarm Initialization"
sudo docker swarm init
echo -e $"Creating Docker Images:"
sudo docker build -t auth-microservice -f AuthMicroservice/Dockerfile AuthMicroservice
sudo docker build -t social-microservice -f SocialMicroservice/Dockerfile SocialMicroservice
sudo docker build -t product-microservice -f ProductMicroservice/Dockerfile ProductMicroservice
sudo docker build -t frontend-microservice -f FrontendMicroservice/Dockerfile FrontendMicroservice
sudo docker build -t file-microservice -f FileMicroservice/Dockerfile FileMicroservice
sudo docker build -t cryptographic-microservice -f CryptographicMicroservice/Dockerfile CryptographicMicroservice
sudo docker build -t email-microservice -f EmailMicroservice/Dockerfile EmailMicroservice
echo -e $"Starting the stack"
sudo docker stack deploy -c ./docker-compose.yml talk
echo -e $"Finish"
