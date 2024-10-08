FROM node:16-alpine
WORKDIR /MERN-stack-practice
COPY package*.json ./
RUN npm cache clean --force
RUN npm install
COPY . .
EXPOSE 1075
CMD ["npm", "start"]