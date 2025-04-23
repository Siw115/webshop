FROM maven:3.8.3-openjdk-17 AS maven_build
WORKDIR /app
COPY pom.xml .
COPY src src
RUN mvn package -DskipTests

FROM openjdk:17-jdk-alpine
COPY --from=maven_build /app/target/*.jar /app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]