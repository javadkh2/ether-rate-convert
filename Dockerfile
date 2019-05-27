FROM node:alpine
ADD ./ /app
CMD [ "node", "/app/dist/index.js" ]