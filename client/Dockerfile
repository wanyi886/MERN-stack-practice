FROM node:16-alpine
WORKDIR /MERN-stack-practice
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 1076
CMD ["npm", "start"]