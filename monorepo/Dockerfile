FROM node:20.19.3-alpine3.21

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN mkdir /workspace && \
   mkdir /workspace/node_modules &&  \
   mkdir /workspace/node_modules/.cache && \
   chown -R node:node /workspace/node_modules/.cache

# Enable pnpm using corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /workspace

COPY . /workspace

EXPOSE 8088
EXPOSE 8089

RUN CI=1 pnpm install

##ENTRYPOINT ["tail", "-f", "/dev/null"] ## use while setting up project 