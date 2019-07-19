#!/bin/sh


#npm install && npm start &
http-server /opt/tmp/dist/ -p 8081 &
java -jar /opt/tmp/prova-0.0.1-SNAPSHOT.jar 
