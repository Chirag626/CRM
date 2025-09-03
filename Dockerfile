# 1. Base image
FROM openjdk:17-jdk-slim


# 2. Set working directory
WORKDIR /app

# 3. Copy Maven wrapper and pom
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# 4. Fix line endings & make wrapper executable
RUN sed -i 's/\r$//' mvnw && chmod +x mvnw

# 5. Pre-download dependencies
RUN ./mvnw -B -DskipTests dependency:go-offline

# 6. Copy source code
COPY src ./src

# 7. Build the application
RUN ./mvnw -B -DskipTests clean package

# 8. Expose port
EXPOSE 8080

# 9. Run the JAR
CMD ["sh", "-c", "java -jar target/*.jar"]
