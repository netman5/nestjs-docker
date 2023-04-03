FROM node:19 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm install

RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:19

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/prisma ./prisma/
COPY --from=builder /usr/src/app/.env ./
COPY --from=builder /usr/src/app/tsconfig.build.json ./
COPY --from=builder /usr/src/app/tsconfig.json ./
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

RUN ls -l

CMD ["npm", "run", "start:dev"]