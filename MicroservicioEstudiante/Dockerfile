FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/microservicio-estudiante.jar app.jar 

EXPOSE 8003  

ENTRYPOINT ["java", "-jar", "app.jar"]