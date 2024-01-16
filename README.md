<p align="center">
<a href="https://sourcegraph.com/" target="_blank">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://p21.p4.n0.cdn.getcloudapp.com/items/6qub2y6g/8c25cf68-2715-4f0e-9de6-26292fad604f.svg" width="50%">
  <img src="https://p21.p4.n0.cdn.getcloudapp.com/items/12u7NWXL/5e21725d-6e84-4ccd-8300-27bf9a050416.svg" width="50%">
</picture></a>
</p>

<p align="center">
    <a href="https://docs.sourcegraph.com">Docs</a> •
    <a href="https://sourcegraph.com/github.com/sourcegraph/sourcegraph/-/blob/CONTRIBUTING.md">Contributing</a> •
    <a href="https://twitter.com/sourcegraph">Twitter</a> •
    <a href="https://discord.gg/s2qDtYGnAE">Discord</a>
    <br /><br />
    <a href="https://buildkite.com/sourcegraph/sourcegraph">
        <img src="https://badge.buildkite.com/00bbe6fa9986c78b8e8591cffeb0b0f2e8c4bb610d7e339ff6.svg?branch=main" alt="Build status" />
    </a>
    <a href="https://api.securityscorecards.dev/projects/github.com/sourcegraph/sourcegraph">
        <img src="https://img.shields.io/ossf-scorecard/github.com/sourcegraph/sourcegraph?label=openssf%20scorecard" alt="Scorecard" />
    </a>
    <a href="https://github.com/sourcegraph/sourcegraph/releases/">
        <img src="https://img.shields.io/github/release/sourcegraph/Sourcegraph.svg" alt="Latest release" />
    </a>
    <a href="https://srcgr.ph/discord">
        <img src="https://img.shields.io/discord/969688426372825169?color=5765F2" alt="Discord" />
    </a>
    <a href="https://github.com/sourcegraph/sourcegraph/contributors/">
        <img src="https://img.shields.io/github/contributors/sourcegraph/Sourcegraph.svg?color=000000" alt="Contributors" />
    </a>
</p>
<br />

**Sourcegraph makes it easy to read, write, and fix code—even in big, complex codebases.**

- **Code search:** Search all of your repositories across all branches and all code hosts.
- **Code intelligence:** Navigate code, find references, see code owners, trace history, and more.
- **Fix and refactor:** Roll out large-scale changes to many repositories at once and track big migrations.

## Getting started

### Running the code locally
To run the code locally, follow these steps:
1. Clone the repository.
2. Install the necessary dependencies using `npm install` or a similar command.
3. Set up any required environment variables or secrets by creating a `.env` file and populating it with the necessary values.
4. Run the code using the command `npm start` or a similar command.

### Running the code through GitHub Actions
To run the code through GitHub Actions, follow these steps:
1. Define the necessary environment variables or secrets in your GitHub repository settings.
2. Ensure that the GitHub Actions workflow file (e.g., `.github/workflows/main.yml`) is set up correctly to trigger the code execution.
3. Push changes to the repository to trigger the GitHub Actions workflow.

### Purpose
Provide a brief overview of the purpose of the code here.

### Dependencies
List any specific dependencies or tools required to run the code.

### Specific Requirements
Document any specific system requirements or configurations needed to run the code.

### Setting up Environment Variables or Secrets
Explain how to set up the necessary environment variables or secrets, including any example configuration or file formats.

### Known Issues and Limitations
Document any known issues or limitations of the code, and provide any workarounds if available.

- [Use Sourcegraph on the cloud or self-hosted](https://docs.sourcegraph.com/)
- [Sourcegraph.com public code search](https://sourcegraph.com/search)

<br><br>

<img src="https://sourcegraph.com/home/banner.png" />

## Development

Refer to the [Developing Sourcegraph guide](https://docs.sourcegraph.com/dev) to get started.

### Documentation

The `doc` directory has additional documentation for developing and understanding Sourcegraph:

- [Project FAQ](./doc/admin/faq.md)
- [Architecture](./doc/dev/background-information/architecture/index.md): high-level architecture
- [Database setup](./doc/dev/background-information/postgresql.md): database best practices
- [Go style guide](./doc/dev/background-information/languages/go.md)
- [Documentation style guide](https://handbook.sourcegraph.com/engineering/product_documentation)
- [GraphQL API](./doc/api/graphql/index.md): useful tips when modifying the GraphQL API
- [Contributing](./CONTRIBUTING.md)

## License

This repository contains primarily non-OSS-licensed files. See [LICENSE](LICENSE).
