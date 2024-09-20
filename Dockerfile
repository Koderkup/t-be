#----------------------- builder ---------------------#
FROM node:20.15.1-alpine AS builder
WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm install -g npm@10.8.2               
RUN npm install
COPY . .
RUN npm run prisma-generate
RUN npm run build
#----------------------- Release ---------------------#
FROM builder AS release
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

RUN apk add ffmpeg
# & npm prune --omit=dev --verbose --no-interactive
CMD npm run migrate-up && npm run seed && npm run start

