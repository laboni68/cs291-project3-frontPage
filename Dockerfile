# Get the node version 14
FROM node:14

# Setup the working directory
WORKDIR /usr/src/chat_client

# Copy the package.json and package-lock.json
COPY package*.json ./

# run npm install to install all the dependencies
RUN npm install

# Bundle the app source
COPY . .

# This will expose the container port of 3000
# On this port our front end will be run
EXPOSE 3000

CMD ["npm", "start"]
