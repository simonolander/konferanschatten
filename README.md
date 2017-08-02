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
```
npm install babel-core babel-loader babel-preset-es2015 babel-preset-react --save
```
```
touch .babelrc

{
  "presets": ["es2015", "react"]
}
```
##### webpack.config.js
```
// Existing Code ....
var config = {
  // Existing Code ....
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  }
}
```
```
npm install react react-dom --save
```
##### index.jsx
```
import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return <p> Hello React!</p>;
  }
}

render(<App/>, document.getElementById('app'));
```
##### package.json
```
"scripts": {
  "dev": "webpack -d --watch",
  "build" : "webpack -p"
},
```
