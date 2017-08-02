# Konferenschatten
## Ett enkelt intro till react

```
npm init
npm install webpack --save
touch webpack.config.js
```
```
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  }
};

module.exports = config;
```
```
mkdir -p src/client/app
```
```
touch src/client/app/index.jsx
```
```
console.log("Hello JSX")
```
```
./node_modules/.bin/webpack -d
```
```
touch src/client/index.html
```
```
<html>
  <head>
    <meta charset="utf-8">
    <title>React.js using NPM, Babel6 and Webpack</title>
  </head>
  <body>
    <div id="app" />
    <script src="public/bundle.js" type="text/javascript"></script>
  </body>
</html>
```
