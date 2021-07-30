# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/
RUN apt-get update -qq && apt-get install -y build-essential nodejs
# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/iwas /usr/share/nginx/html

# Expose port 80
EXPOSE 80

#Run Command
#docker build --tag=iwas-angular:latest
#docker run -d -p 9081:80 iwas-angular:latest
