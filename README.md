# Konferenschatten - ReactJS
I den här labben kommer vi att skapa en enkel chatapplikation i ReactJS från grunden. Vi kommer att ladda ner de verktyg som behövs för att bygga projektet, sätta upp projektstrukturen, skriva applikationen, och koppla upp den mot ett api för att kunna chatta med de andra deltagarna.

## Innan vi startar

### Vad är React?
[React](https://facebook.github.io/react/) är ett javascriptbibliotek för att skapa användargränssnitt. En kort beskrivning är att reactkod låter oss skriva komponenter som sköter datahantering, html-markup, eller båda två. Filerna som förknippas med react är `.jsx`. Se dem som js-filer med html-stycken. Vi kommer att skriva merparten av vår kod i `jsx` och transpilera den till javascript.

### Node Packet Manager (npm)
Vi kommer inte att skriva all kod från grunden, utan använda oss av en del tredjepartsbibliotek. För att smidigt hämta och hantera alla bibliotek kommer vi att använda [NPM](https://www.npmjs.com/), ett pakethanteringsverktyg för Node.js. NPM kommer också att hjälpa oss att sätta upp vår applikationsstruktur.

#### Installation
`npm` är ett terminalverktyg som vi måste installera. Om du har `apt-get`, `brew`, `yum` eller liknande kan du hitta `npm` där, annars kan du ladda ner den senaste versionen på https://nodejs.org. LTS räcker gott för våra ändamål.

Efter installationen, kontrollera att du kan komma åt programmet från terminalen.
```commandline
npm --version
5.3.0
```
```commandline
node --version
v7.4.0
```
Vi kommer inte att använda `node` i det här projectet, men `npm` behöver det för att fungera. Om du har andra versionsnummer så gör det ingenting.

### Konferenschatten-repot
Det är en god idé att dra ner [repot](https://github.com/simonolander/konferenschatten) som du läser ifrån just nu, det är en färdig version av labben vi kommer att genomföra. Vi kommer att använda några bilder därifrån under labben, och du kan använda det som ett facit ifall något är fel eller saknas i det här dokumentet.
Navigera till din favoritfolder för project och kör 
```commandline
git clone https://github.com/simonolander/konferenschatten
```
Alternativt kan du hämta repot som en `.zip` på https://github.com/simonolander/konferenschatten/archive/master.zip.

Byt namn på foldern till `konferenschatten-complete` el.dyl. och skapa upp en folder parallellt med namnet `konferenschatten`. Du borde se
```commandline
ls
konferenschatten    konferenschatten-complete
```
## Setup

### Projektstruktur
Vi ska nu sätta upp ett nytt projekt. Gå till den tomma foldern som du skapade i det förra steget, hädanefter `konferenschatten` och kör
```
npm init
```
`npm` kommer att fråga dig om information om projektet. Du kan lämna alla fält tomma men det skadar inte att fylla i `description` och `author` om du känner för det. Det kommer att skapas en `package.json` fil i foldern med innehållet
```json
{
  "name": "konferenschatten",
  "version": "1.0.0",
  "description": "En enkel chatapplikation",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
`package.json` håller koll på projektinformation, byggscript, och dependencies. Vi kommer att uppdatera de två sistnämnda inom kort.
Vår projectstruktur kommer att se ut som följande
```text
.
├── node_modules  <-- Alla våra tredjepartsbibliotek
├── package.json  <-- Vår projektmetadata
└── src
    └── client
        ├── app  <-- Vår källkod
        └── public  <-- Vår generade kod och våra assets
```
Vi tar och skapar upp `app` och `public`
```commandline
mkdir -p src/client/app
mkdir -p src/client/public
```

### Webpack
Vi ska också ta och installera vårt första bibliotek: `webpack`. Om du ser varningar ang. avsaknad av `description` eller likande så kan du ignorera dem.
```commandline
npm install webpack --save
```
`webpack` är ett verktyg som paketerar våra `.jsx`-filer till en javascript-bundle som vår browser kan läsa. Den behöver också en config-fil för att fungera. Skapa upp `webpack.config.js` med innehållet

###### webpack.config.js
```javascript
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};

module.exports = config;
```
##### Kort om webpack.config.js:
* `entry` är filen som agerar main-metod i vårt program
* `output` är där all transpilerad kod kommer att hamna
* `loaders.include` är foldern där webpack kommer att leta efter filer
* `loaders.loader`: specar ifall vi vill transpilera javascript-koden ytterligare, i vårt fall m.h.a. babel
* `resolve.extensions` specar vilka file-extensions som ska transpileras

### Babel
Vi kommer att skriva vår javascript i [Ecmascript 6](http://es6-features.org/). Anledningen är främst att es6 har en massa features som är väldigt trevliga, t.ex. moduler och pilnotationer. Dessvärre är browserstödet lite si och så, vilket betyder att vi kommer att transpilera vår javascript till es5. Detta görs under huven m.h.a. Babel. För att sätta upp babel så behöver vi installera några dependencies och skapa en config-fil.
```commandline
npm install babel-core babel-loader babel-preset-es2015 babel-preset-react --save
```
```commandline
touch .babelrc
```
###### .babelrc
```json
{
  "presets": ["es2015", "react"]
}
```

## Hello ReactJS!
Vi har hittills bara sysslat med projektsetup, men nu är det dags att skriva lite kod! Vi börjar med att skapa `src/client/index.html`
```commandline
touch src/client/index.html
```
###### index.html
```html
<html>
  <head>
    <meta charset="utf-8">
    <title>Konferenschatten, R2M 2017</title>
  </head>
  <body>
    <div id="app" />
    <script src="public/bundle.js" type="text/javascript"></script>
  </body>
</html>
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
