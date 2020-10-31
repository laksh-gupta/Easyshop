FROM node:12

WORKDIR /easyshop

COPY . .

RUN ls

ENV NODE_ENV="production"
ENV PORT=8080
RUN npm install
RUN cd client && ls && npm install && npm run build

EXPOSE 8080

CMD [ "node", "server.js" ]