FROM node:16-alpine

WORKDIR /usr/app-back

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

ENTRYPOINT [ "npm" ]
CMD [ "run", "start:dev" ]