# ---------- STAGE 1: BUILD ----------
FROM eclipse-temurin:21-jdk-jammy AS build

RUN apt-get update && apt-get install -y maven python3 python3-pip
WORKDIR /app
COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# ---------- STAGE 2: RUNTIME ----------
FROM eclipse-temurin:21-jre-jammy

RUN apt-get update && apt-get install -y python3 python3-pip
WORKDIR /app

COPY --from=build /app/target/device-recommendation-0.0.1-SNAPSHOT.jar ./app.jar
COPY main.py recommendation_system.py device_dataset.csv ./

EXPOSE 8080
ENV PORT=8080
ENV JAVA_TOOL_OPTIONS="-Dserver.port=$PORT"

ENTRYPOINT ["java", "-jar", "app.jar"]
