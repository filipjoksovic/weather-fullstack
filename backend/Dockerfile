FROM gradle:jdk21 as build
WORKDIR /workspace
COPY . .
RUN gradle bootJar --no-daemon

FROM openjdk:21
WORKDIR /app
COPY --from=build /workspace/build/libs/*.jar app.jar
CMD [ "java", "-jar", "app.jar"]