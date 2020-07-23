// Adapted from create-react-app 
// https://github.com/facebook/create-react-app/blob/26a1c7f6b38fe7119a8fd92d10eb63597376d7de/packages/react-scripts/config/env.js

// Populates process.release from RELEASE_ environment variables
function getReleaseEnvironmentVariables() {
  const RELEASE = /^RELEASE_/i;

  const raw = Object.keys(process.env)
  .filter(key => {
    return RELEASE.test(key)
  }).reduce(
    (env, key) => {
      env[key] = process.env[key];
      return env;
    }, {})

  // Stringify all values so we can feed into webpack DefinePlugin
  const stringified = {
    'process.release': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified }
}

module.exports = getReleaseEnvironmentVariables;
