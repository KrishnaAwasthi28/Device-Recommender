# ---------- STAGE 1: BUILD ----------
FROM eclipse-temurin:17-jdk-jammy AS build

# Install Maven
RUN apt-get update && apt-get install -y maven python3 python3-pip

# Set working directory
WORKDIR /app

# Copy Maven config first for caching
COPY pom.xml .
COPY src ./src

# Build the Spring Boot JAR
RUN mvn clean package -DskipTests

# ---------- STAGE 2: RUNTIME ----------
FROM eclipse-temurin:17-jre-jammy

# Install Python (for ML script)
RUN apt-get update && apt-get install -y python3 python3-pip

# Set working directory
WORKDIR /app

# Copy JAR from the build stage
COPY --from=build /app/target/device-recommendation-0.0.1-SNAPSHOT.jar ./app.jar

# Copy Python ML scripts + dataset
COPY main.py recommendation_system.py device_dataset.csv ./

# Expose port
EXPOSE 8080

# Set environment variables
ENV PORT=8080
ENV JAVA_TOOL_OPTIONS="-Dserver.port=$PORT"

# Start the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
