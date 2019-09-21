# Brote App Server

The server side of Brote app, a publishing platform.

## Tools
Key tools used in this project:

| Tool           | Description  |
| :-------------:|--------------|
| [Node](https://nodejs.org/en/) | App based on Node |
| [Typescript](https://www.typescriptlang.org/) | A typed superset of Javascript that compiles to plain Javascript |
| [Graphql-yoga](https://github.com/prisma/graphql-yoga) | A graphql server boilerplate built on top of express and other packages |
| [Prisma](http://prisma.io) | Used as a data modeling tool and to use the auto-generated and type-safe database client. Used postgres as database |
| [Heroku](http://heroku.com/) | Used to deploy prisma server |
| [Now](http://zeit.co/) | Used to deploy graphql server |
| [New Relic](https://newrelic.com//) | Used to keep the server awake |

## Installation

Used __Node__ v11.4.0.

1. To use the Prisme CLI install prisma:
    ```
    npm i -g prisma
    or
    brew tap prisma/prisma
    brew install prisma
    ```

2. To run prisma server in a local environtment, you need to have docker installed. [Install Docker](https://docs.docker.com/install/)

3. Clone project repo:
    ```
    git clone https://github.com/r0o0/brote-app.git
    ```

4. Go to project directory:
    ```
    cd brote-app/server
    ```
5. Install package dependencies:
    ```
    yarn
    ```
6. Start prisma server with docker:
    ```
    docker-compose up -d
    ```
    Prisma server now runs on `http://localhost:4080`

7. Now initialize prisma server
    ```
    prisma init --endpoint http://localhost:4080
    ```

8. Whenever you change the datamodel in './database/datamodel.prisma' you need to deploy the prisma datamodel using the prisma cli command:
    ```
    // using prisma cli:
        prisma deploy
    // using yarn:
        yarn prisma
    ```

9. Now start GraphQLR server:
    ```
      yarn start
    ```