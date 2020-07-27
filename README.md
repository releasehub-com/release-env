# release_js

`release_js` is a small package that exposes environment variables from [Release](https://releaseapp.io) to your application at run time. Any environment variable that starts
with `RELEASE_` will be exposed at run time via `process.release`. We chose not to use
`process.env` in an attempt to mitigate any risk of altering existing environment variables
when adding them from Release.

## Motivation

Release allows for the creation of ephemeral staging environments, meaning there are new
URLs for services every time an environment is created. If your Javascript application needs
to talk to a service which has been given an undetermined URL then that URL needs to
be exposed via an environment variable. Without server side rendering, these environment variables need
to be available and exposed when the application starts or when a static build is built.

The idea behind `release_js` comes from
[Create React App](https://reactjs.org/docs/create-a-new-react-app.html) and how
`REACT_APP_` environment variables are exposed via `process.env`(see [Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)).

#### Create React App

If you are using `Create React App` it is not necessary to use `release_js` as you
can achieve the functionality of this package by mapping Release environment variables to
`REACT_APP_` variables. Please see the Release docs on [Mapping Environment Variables]().

## Installtion

```
# with npm 
npm install release-js
 
# or with Yarn 
yarn add release-js
```

## Adding to Webpack

In your `webpack.config.js` file import the `getReleaseEnvironmentVariables` function.

```
const getReleaseEnvironmentVariables = require("release-js");
```

Inside of the `module.exports`, access the Release environment variables.

```
module.exports = function(webpackEnv) {
  const releaseEnv = getReleaseEnvironmentVariables();
  ...
}
```

Define a new plugin with the Release environment variables.

```
plugins: [
  new webpack.DefinePlugin(releaseEnv.stringified),
  ...
]
```

## Usage

After you've added `release-js` to Webpack, in your application the environment variables will be accessible via 
`process.release.RELEASE_ENV_VAR`.
