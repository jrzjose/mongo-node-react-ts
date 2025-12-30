# project init

create initial image
```shell
    podman build -t node-tmp .
```
> create a `tmp` folder 
run the container
```shell
    podman run -d -p 8080:8080 --name node-tmp-cntr -v tmp:/workspace:rw,Z node-tmp
```

bootstrap project: 
setup a Vite Express app using create-vite-express package
https://www.npmjs.com/package/vite-express/v/0.5.4
```shell
npx create-vite-express@latest 

# next steps
 1. cd app
 2. npm install
 3. npm run dev
```

output:
src
├── /client            # React + Vite + TypeScript (Frontend)
│   ├── /assets
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── tsconfig.json
│   └── vite-end.d.ts
├── /server             # (Backend)
│   ├── 
│   └── main.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── 




```shell
npm install
npm run dev
```

https://hub.docker.com/r/mongodb/mongodb-community-server/tags

#### run system
```shell
podman compose up
```


#### additional packages
```shell
# installing react-router-dom 
npm install react-router-dom

# material
npm install @mui/material @emotion/react @emotion/styled

# icons-material
npm install @mui/icons-material

# axios
npm install axios
```


#### prompt
> help me write the UI of a web app using the react-crud component part of the Material-UI framework, 
implement web api: http://localhost:8080/api/contests which returns a payload similar to the following example:
```json
{"contests":[{"id":"cognitive-building-bricks","categoryName":"Business/Company","contestName":"Cognitive Building Bricks"},{"id":"educating-people-about-sustainable-food-production","categoryName":"Magazine/Newsletter","contestName":"Educating people about sustainable food production"},{"id":"big-data-analytics-for-cash-circulation","categoryName":"Software Component","contestName":"Big Data Analytics for Cash Circulation"},{"id":"free-programming-books","categoryName":"Website","contestName":"Free programming books"}]}
```
note: it did not use react-crud but it provided a good code snippet

