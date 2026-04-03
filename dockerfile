FROM node:21-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
COPY prisma/schema.prisma ./prisma/schema.prisma
EXPOSE 3000
CMD ["npm", "run", "dev"]Q