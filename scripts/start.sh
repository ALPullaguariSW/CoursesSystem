#!/bin/bash

# Start the Spring Boot applications
java -jar /opt/cursos/app.jar &
java -jar /opt/estudiantes/app.jar &

# Start Nginx
nginx -g "daemon off;"