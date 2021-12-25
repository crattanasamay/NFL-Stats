FROM node:12

WORKDIR /assignment-2---final-project-repository-group-14

COPY package*.json ./

RUN npm install 

COPY . .

ENV PORT 5000

EXPOSE 5000

CMD ["npm","start"]