# Step 1: Use a base image with Java and Python
FROM openjdk:17-slim

# Step 2: Install Python
RUN apt-get update && apt-get install -y python3 python3-pip

# Step 3: Set the working directory inside the container
WORKDIR /app

# Step 4: Copy project files into the container
COPY . .

# Step 5: Build the Spring Boot app
RUN ./mvnw clean package -DskipTests

# Step 6: Expose the port Render will use
EXPOSE 8080

# Step 7: Set environment variable for Render
ENV PORT=8080
ENV JAVA_TOOL_OPTIONS="-Dserver.port=$PORT"

# Step 8: Command to run the Spring Boot JAR
CMD ["java", "-jar", "target/device-recommendation-0.0.1-SNAPSHOT.jar"]
