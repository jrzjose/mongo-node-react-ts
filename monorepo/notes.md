#### PNPM (Performant NPM)
Pros: Fastest installs/updates, highest disk space efficiency (global store/symlinks), solves phantom deps, excellent monorepo support.
Cons: Slightly different install model (symlinks), requires pnpm installation.
Best For: Performance-critical projects, large monorepos, efficiency. 


### project init

create initial image
```shell
    podman build -t node-tmp .
```
> create a `tmp` folder 
run the container
```shell
    podman run -d -p 8080:8080 --name node-tmp-cntr -v tmp:/workspace:rw,Z node-tmp
```


### initialize a basic package.json file
```shell
pnpm init
mkdir apps && mkdir apps/server && mkdir packages
```

### configure workspace `pnpm-workspace.yaml`
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### initialize apps
```shell
cd apps/server/
pnpm init
# install typescript
pnpm add -D typescript ts-node
# init TS config
pnpm exec tsc --init

pnpm add express mongoose dotenv cors helmet pino pino-pretty pino-http

pnpm add @types/express @types/node ts-node-dev -D

pnpm add -D ts-node-dev @types/express @types/node eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin


# initialize front-end
cd ..
pnpm create vite 
# framework: React > variant: TypeScript ...
# option 2: pnpm create vite@latest client --template react-ts

# additional packages needed
cd client
pnpm add axios
pnpm add react-router-dom 
pnpm add @mui/material 
pnpm add @emotion/react @emotion/styled 
pnpm add @mui/icons-material

pnpm add -D prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier 

# init shared package
cd ../..
mkdir packages/shared
cd packages/shared/
pnpm init
cd ../..
# add concurrently
pnpm add -D concurrently
```

