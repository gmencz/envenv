### Collaborating
1. Make sure you have [Docker](https://www.docker.com/get-started) installed.
2. Fork the repo.
3. Clone the repo.
4. Open the cloned repo on your computer.
5. Install lerna with `npm install -g lerna` **or** you can use `npx` to run the commands as an alternative.
6. Run `lerna bootstrap` **in the project root** to install the monorepo's dependencies and `npm install` also in the project root to install eslint and others.
7. Download the environment files and secrets from here: https://gofile.io/d/nwU122
8. Once downloaded, place them in the cloned repo following the zip's folder structure. Now replace the APOLLO_KEY environment variable of the **services** and **NOT** the api gateway for your own user key which you can get in [AGM](https://engine.apollographql.com)
9. Now you can start up the application (dev environment) with `docker-compose up`
10. Nginx reverse proxy listening on `http://localhost:8080/` 🚀
11. Nginx proxying endpoints:
    - GraphQL API Gateway -> `http://localhost:8080/graphql`
    - OAuth -> `http://localhost:8080/oauth/...`
    - React app -> Every other route (`http://localhost:8080/...`)
12. Make changes and commit them.
13. Submit a PR (Pull Request), the PR will be reviewed as soon as possible and if valid merged into master.

### Branch naming convention
- New feature -> feature/name-of-the-new-feature
- Bug fixes -> hotfix/name-of-the-bug
- Chores (changes which don't affect production code, e.g modifying .gitignore) -> chore/name-of-the-chore
