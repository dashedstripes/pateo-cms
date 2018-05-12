# Pateo CMS

A content management system built with NodeJS.

## Getting Started

This app is split into two modules, `server` and `client`.

### Server Setup

Install the dependencies with 

```
$ yarn install
```

Create dev, test, and production databases in postgres, then set the config at `src/db/config.js`. Then run the setup script:

```
$ yarn setup
```

Finally, run the api server

```
$ yarn dev
```

### Client Setup

Run the following commands in a separate shell to the server.

Install the dependencies with 

```
$ yarn install
```

Finally, run the client development server

```
$ yarn dev
```

## Testing

Tests are kept in the `spec/` folder. You can run tests with `yarn test`