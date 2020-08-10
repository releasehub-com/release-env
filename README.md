# release-env

`release-env` is a small package that exposes environment variables from [Release](https://releaseapp.io) to your application at run time. Any environment variable that starts
with `RELEASE_` will be exposed at run time via `process.env`.

## Motivation

Release allows for the creation of ephemeral staging environments, meaning there are new
URLs for services every time an environment is created. If your Javascript application needs
to talk to a service which has been given a generated URL then that URL needs to
be exposed via an environment variable. Without server side rendering, these environment variables need
to be available and exposed when the application starts or when a static build is built.

The idea behind `release-env` comes from
[Create React App](https://reactjs.org/docs/create-a-new-react-app.html) and how
`REACT_APP_` environment variables are exposed via `process.env`(see [Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)).

#### Create React App

If you are using `Create React App` it is not necessary to use `release-env` as you
can achieve the functionality of this package by mapping Release environment variables to
`REACT_APP_` variables. Please see the Release docs on [Mapping Environment Variables]().

## Installtion

```
# with npm 
npm install release-env
 
# or with Yarn 
yarn add release-env
```

## Adding to Webpack

In your `webpack.config.js` file import the `getReleaseEnvironmentVariables` function.

```javascript
const getReleaseEnvironmentVariables = require("release-env");
```

Inside of the `module.exports`, access the Release environment variables.

```javascript
module.exports = function(webpackEnv) {
  const releaseEnv = getReleaseEnvironmentVariables();
  ...
}
```

Define a new plugin with the Release environment variables.

```javascript
plugins: [
  new webpack.DefinePlugin(releaseEnv.stringified),
  ...
]
```

## Usage

In your application the environment variables will be accessible via  `process.env.RELEASE_ENV_VAR`. An example
would be to be define a configuration file to store API paths.

```javascript
// config.js

export default {
  API_URL: process.env.RELEASE_BACKEND_INGRESS_URL,
};
```

```javascript
// api.js

import axios from "axios";
import config from "./config";

const client = axios.create({
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default client;
```
