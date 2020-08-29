### Contributing

1. Make sure you have [Docker](https://www.docker.com/get-started) installed.
2. Fork the repo.
3. Clone the repo.
4. Open the cloned repo on your computer.
5. Install root dependencies with `npm install`.
6. Run `npx lerna bootstrap` **in the project root** to install the monorepo's dependencies and `npm install` also in the project root to install eslint and others.
7. # Download the environment files and secrets from [here](https://gofile.io/d/DRUE26)
8. Run `npx lerna bootstrap` **in the project root** to install the monorepo's dependencies.
9. Download the environment files and secrets from [here](https://gofile.io/d/ulVoX5)
10. Once downloaded, place them in the cloned repo following the zip's folder structure. Now replace the APOLLO_KEY environment variable of the **services** and **NOT** the api gateway for your own user key which you can get in [AGM](https://engine.apollographql.com)
11. Now you can start up the application (dev environment) by running the following:
    1. `npm run containers:dev` **(wait for this to finish)**, _whenever both the database and the redis instance display they're ready to accept connections this should be finished._
    2. `npm run dev`.
12. 🚀 App up and running on the following endpoints:
    - GraphQL API Gateway -> [http://localhost:7000/graphql](http://localhost:7000/graphql)
    - GraphQL Accounts microservice -> [http://localhost:5000/graphql](http://localhost:5000/graphql)
    - GraphQL Environments microservice -> [http://localhost:5001/graphql](http://localhost:5001/graphql)
    - React client -> [http://localhost:3000](http://localhost:3000)

### Branch naming convention

- New feature -> feature/name-of-the-new-feature
- Bug fixes -> bug/name-of-the-bug
- Hotfixes -> hotfix/name-of-the-hotfix
