FROM node:14.11 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN ls -al
COPY ./ .
RUN npm run build
RUN ls -al

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
