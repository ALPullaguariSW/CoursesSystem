FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/microservicio-curso.jar app.jar  

EXPOSE 8002  

ENTRYPOINT ["java", "-jar", "app.jar"]