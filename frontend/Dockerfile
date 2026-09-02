FROM node:20-alpine

# Create app directory and set ownership to the non-root 'node' user
RUN mkdir -p /app && chown -R node:node /app
WORKDIR /app

# Switch to 'node' user before installing dependencies
USER node

COPY --chown=node:node package*.json ./
RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

ENV WATCHPACK_POLLING=true

CMD ["npm", "start"]
