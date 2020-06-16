### Contributing

1. Make sure you have [Docker](https://www.docker.com/get-started) installed.
2. Fork the repo.
3. Clone the repo.
4. Open the cloned repo on your computer.
5. Install root dependencies with `npm install`.
6. Run `npx lerna bootstrap` **in the project root** to install the monorepo's dependencies.
7. Download the environment files and secrets from here: https://gofile.io/d/DRUE26
8. Once downloaded, place them in the cloned repo following the zip's folder structure. Now replace the APOLLO_KEY environment variable of the **services** and **NOT** the api gateway for your own user key which you can get in [AGM](https://engine.apollographql.com)
9. Now you can start up the application (dev environment) with `docker-compose up --build`
10. Nginx reverse proxy listening on `http://localhost:8080/` 🚀
11. Nginx proxying endpoints:
    - GraphQL API Gateway -> `http://localhost:8080/graphql`
    - OAuth -> `http://localhost:5000/...`
    - React app -> Every other route (`http://localhost:8080/...`)
12. Make changes and commit them.
13. Submit a PR (Pull Request), the PR will be reviewed as soon as possible and if valid merged into master.

### Branch naming convention

- New feature -> feature/name-of-the-new-feature
- Bug fixes -> bug/name-of-the-bug
- Hotfixes -> hotfix/name-of-the-hotfix
