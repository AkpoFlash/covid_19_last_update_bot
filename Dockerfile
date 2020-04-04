FROM node:13-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
EXPOSE 3000
CMD ["npm", "run", "start"]
