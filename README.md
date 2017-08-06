# Konferenschatten
### En enkel chatapplikation i ReactJS
I den här labben kommer vi att skapa en enkel chatapplikation från grunden.


## Innan vi startar

### Vad är React?
[React](https://facebook.github.io/react/) är ett javascriptbibliotek för att skapa användargränssnitt. En kort beskrivning är att reactkod låter oss skriva komponenter som sköter datahantering, html-markup, eller båda två. Filerna som förknippas med react är `.jsx`. Se dem som js-filer med html-stycken. Vi kommer att skriva merparten av vår kod i `jsx` och transpilera den till javascript.

### Node Packet Manager (npm)
Vi kommer inte att skriva all kod från grunden, utan använda oss av en del tredjepartsbibliotek. För att smidigt hämta och hantera alla bibliotek kommer vi att använda [NPM](https://www.npmjs.com/), ett open source verktyg för Node.js. NPM kommer också att hjälpa oss att sätta upp vår applikationsstruktur.

#### Installation
`npm` är ett terminalverktyg som vi måste installera. Om du har `apt-get`, `brew`, `yum` eller liknande kan du hitta `npm` där. Annars kan du ladda ner den senaste versionen på https://nodejs.org. LTS räcker gott för våra ändamål.

Efter installationen, kontrollera att du kan komma åt programmet från terminalen.
```commandline
npm --version
5.3.0
```
```commandline
node --version
v7.4.0
```

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
```
npm install react-bootstrap --save
```
##### index.html
```
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css">
```
##### webpack.config.js
```
resolve: {
  extensions: ['.js', '.jsx'],
}
```
```
npm install --save prop-types
```
```
body, html {
    background: url("public/images/topography.png");
}
```
```
<Media>
    <Media.Left>
        <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
    </Media.Left>
    <Media.Body>
        <Media.Heading>Media Heading</Media.Heading>
        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
    </Media.Body>
</Media>
```
```
npm install axios --save
```
```
npm install moment --save
```
