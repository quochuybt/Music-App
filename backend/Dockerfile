FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=build /app/target/musicapp-0.0.1-SNAPSHOT.jar app.jar

ENV SERVER_PORT=10000
EXPOSE 10000

ENTRYPOINT ["java", "-jar", "app.jar"]
