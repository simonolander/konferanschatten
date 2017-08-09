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
###### package.json
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

## Hello JSX!
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
Inte så mycket kod, eller hur? Hela appen kommer så småningom rendreras av `bundle.js` som vi inte genererat än. För att generera den behöver vi skapa `index.jsx` som vi pekade ut i `package.json` tidigare.
```commandline
touch src/client/app/index.jsx
```
###### index.jsx
```javascript
console.log("Hello JSX!")
```
`index.jsx` är den fil som agerar entrypoint i applikationen, och nu när den existerar kan vi äntligen bygga projektet.

I `node_modules` ligger det en hel del bibliotek vid det här laget. Programmet som bygger vår applikation är `node_modules/.bin/webpack`. Låt oss köra den i development mode.
```
./node_modules/.bin/webpack -d
```
Vi har nu byggt projektet för första gången. Öppna `src/client/index.html`; än så länge är det bara en tom html-sida, men om du öppnar consolen så ser du utskriften från `index.jsx`.

## React
Ingenting vi gjort hittils har egentligen med react att göra. React är bara ett bibliotek som använder sig av jsx. Låt oss skapa vår första react-component.
```commandline
npm install react react-dom prop-types --save
```
Vi ska även uppdatera `index.jsx`.
###### index.jsx
```jsx harmony
import React, { Component } from 'react'
import { render } from 'react-dom'

class App extends Component {
  render () {
    return <p>Hello React!</p>
  }
}

render(<App />, document.getElementById('app'))
```
Vad har vi ändrat? Vi har definierat en React-komponent med namnet `App`, som när den rendreras skriver ut en `<p>`-tag.
Vi har två `render`: den första är en metod i `Component` som vi måste överskriva i alla våra komponenter, 
den andra letar upp vår `<div id="app" />` i `index.html` och rendrerar en instans av `App` där. 
`react` och `react-dom` bland importerna är några av de bibliotek som vi installerade tidigare. 
Det kanske ser udda ut med html mitt i en javascript-funktion, men ni kommer att vänja er.

När vi ändrar i jsx-filerna behöver vi bygga om projektet för att ändringarna ska hamna i `bundle.js`.
Det är jobbigt att behöva skriva `./node_modules/.bin/webpack -d` varje gång vi ska bygga, så låt oss skapa två script i `package.json`
###### package.json tillägg
```json
"scripts": {
  "dev": "webpack -d --watch",
  "build" : "webpack -p"
}
```
Vi kan köra `npm run build` för att bygga projektet i production mode, `npm run dev` kör i development mode med en extra `--watch` flagga.
`--watch` gör så att npm håller koll på när filer i projektet ändras, och bygger om projektet när det behövs. Kör
```
npm run dev
```
Ladda om `index.html` i browsern igen, och se den nya `<p>`-tagen med vårt meddelande!


## Komponenter
En React-applikation består av en samling komponenter. 
En komponent är en logiskt hyffsat isolerad del av vår applikation som sköter sin egen rendrering,
och varje komponent kan i sin tur innehålla en eller flera komponenter.

Alla applikationer kan i teorin skrivas med bara en komponent, precis som att alla program kan skrivas i en funktion, 
men det finns en del fördelar med en smart komponentuppdelning.

* Större läsbarhet av kod
* Lättare utveckling
* Återanvändning av komponenter
* Bättre kontroll över omrendrering vid ändring av data

För många eller dumt valda uppdelningar gör dock att kommunikation mellan komponenter blir svårare.  

###### Exempel på en ganska vettig komponentuppdelning
![Exempel på Komponenter](http://coenraets.org/blog/wp-content/uploads/2014/12/uimockscript.png "Exempel på Komponenter")

### Vad behöver vi för komponenter i en chat-applikation?
Vår applikation är inte jättekomplicerad. 
Vi behöver kunna lista meddelanden och skriva nya meddelanden. Varje meddelande borde dessutom kunna visa upp data på ett juste sätt.

###### Förslag på struktur
```text
App
├── MessageList
│   ├── Message
│   ├── Message
│   └── ...
└── MessageInput
```
Jag gillar att ha alla komponenter samlade under en egen folder. Vi börjar med att skapa filerna.
```commandline
mkdir src/client/app/components
touch src/client/app/components/MessageList.jsx
touch src/client/app/components/Message.jsx
touch src/client/app/components/MessageInput.jsx
```
###### MessageList
```jsx harmony
import React, { Component } from 'react'

class MessageList extends Component {

  render () {
    return <div></div>
  }
}

export default MessageList
```
###### Message
```jsx harmony
import React, { Component } from 'react'

class Message extends Component {

  render () {
    return <div></div>
  }
}

export default Message
```
###### MessageInput
```jsx harmony
import React, { Component } from 'react'

class MessageInput extends Component {

  render () {
    return <div></div>
  }
}

export default MessageInput
```
Vi ändrar dessutom `index.jsx` så att den ritar upp första lagret i hierarkin
###### index.jsx tillägg
```jsx harmony
// ...
import MessageList from './components/MessageList'
import MessageInput from './components/MessageInput'

class App extends Component {
  render () {
    return (
      <div>
        <MessageList/>
        <MessageInput/>
      </div>
    )
  }
}
// ...
```
`export` längst ner i filerna gör så att vi kan importera klasserna i andra komponenter.

Kommunikationen mellan komponenterna kommer ske enligt följande
1. `MessageInput` tar emot dina meddelanden och kommunicerar dem till `App`
2. `App` håller koll på en lista med meddelanden som den skickar till `MessageList`
3. `MessageList` tar alla meddelanden och skapar upp ett `Message` för varje meddelande

### `props` och hur vi kommunicerar mellan komponenter
För att kunna skriva meddelanden `MessageInput` behöver vi bygga ut den lite
```jsx harmony
class MessageInput extends Component {

  render () {
    return (
      <form>
        <input name='text'/>
        <button>Skicka</button>
      </form>
    )
  }
}
```
Ladda om appen, det borde se ut något så här
###### Simpelt inputfält
![](https://github.com/simonolander/konferenschatten/blob/master/screenshots/simple-input.png "Simpelt inputfält")
Om du leker runt med inputfältet märker du att det inte gör så mycket: sidan laddas om och meddelandet försvinner.
Vi behöver kommunicera meddelandet till `App` och hindra att sidan uppdateras.

Ett vanligt sätt att kommunicera från en komponent till en förälder är att föräldern skickar en metodreferens till barnet.
Information som skickas från en förälder till ett barn kallas *properties* och finns i variabeln `this.props` i barnet. 
`name` i `input` är ett exempel på en *property*.

Låt oss ändra våra komponenter så att `MessageInput` kan skicka meddelanden till `MessageList`.

###### index.jsx
```jsx harmony
class App extends Component {

  postMessage (text) {
    console.log(`Meddelande från MessageInput: ${text}`)
  }

  render () {
    return (
      <div>
        <MessageList />
        <MessageInput 
          onSubmit={this.postMessage.bind(this)}
        />
      </div>
    )
  }
}
```
Vad är ändrat?
1. Vi har skapat en metod `postMessage(text)` som vi vill ska köras när `MessageInput` submit:ar ett nytt meddelande.
2. Vi skickar med en referens till `postMessage` till `MessageInput` när vi instantierar classen.
`MessageInput` kommer att ha en referens till `postMessage` i `this.props.onSubmit`.
3. `this.postMessage.bind(this)` gör så att vi kan använda `this` i `postMessage`-referensen. 

###### MessageInput.jsx
```jsx harmony
class MessageInput extends Component {

  onSubmit (event) {
    const text = event.target.text.value
    event.preventDefault()
    event.target.reset()

    this.props.onSubmit(text)
  }

  render () {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input name='text'/>
        <button>Skicka</button>
      </form>
    )
  }
}
```
Vad har ändrats?
1. `event.target.text.value` är värdet i vårt text-input vid eventet.
2. `event.preventDefault()` hindrar formuläret från att uppdatera sidan.
3. `event.target.reset()` återställer alla input-fält i formuläret.
4. `this.props.onSubmit(text)` kallar på metoden som skickades in av `App`.
5. `<form onSubmit(...)` låter formuläret veta vilken metod den ska anropa vid en submit. 

Ladda om sidan och se att vi får nya utskrifter!

### `state` och hur vi sparar meddelanden
Just nu så gör vi inte så mycket med våra meddelanden; vi skriver ut dem i konsollen och glömmer dem. 
Vi skulle behöva spara en historik av vad som skrivits. Komponenter har två huvudsätt att hålla information:
1. `props` som vi gått igenom är information som komponenten får från sin förälder
2. `state` används för information som komponenten själv förvaltar

Ändringar i antingen `props` eller `state` triggar en omrendrering av komponenten.

###### index.jsx
```jsx harmony
class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      messages: []
    }
  }

  postMessage (text) {
    this.setState({
      messages: this.state.messages.concat(text)
    })
  }

  render () {
    console.log(this.state.messages)
    return (
      <div>
        <MessageList/>
        <MessageInput
          onSubmit={this.postMessage.bind(this)}
        />
      </div>
    )
  }
}
```
Vad har ändrats?
1. Vi har skapat en `constructor` som körs när komponenten skapas för första gången.
2. I `constructor` initierar vi `state` med en tom lista `state.messages`.
3. I `postMessage` lägger vi på `text` på `this.state.messages` och sparar det i state via `setState`.
4. I `render` logger vi vad det finns för messages i `state`.

Ladda om sidan och se att `messages` växer vid varje anrop!

### Rendrering av messages
Vi vill inte rendrera våra meddelanden i `App`; det ska skötas av `MessageList`. 
Således måste vi skicka listan till `MessageList` via `props` under rendreringen.

###### index.jsx
```jsx harmony
  render () {
    return (
      <div>
        <MessageList
          messages={this.state.messages}
        />
        <MessageInput
          onSubmit={this.postMessage.bind(this)}
        />
      </div>
    )
  }
```

###### MessageList.jsx
```jsx harmony
class MessageList extends Component {

  render () {
    return (
      <ul>
        {this.props.messages.map(text => <li>{text}</li>)}
      </ul>
    )
  }
}
```
Vad har ändrats?
1. Vi skickar med `this.state.messages` som en *property* till `MessageList`, och tog i samma veva bort konsollutskriften.
2. I `MessageList` så rendrerar vi en `<ul>`-tag med en `<li>` för varje meddelande i `this.props.messages`.

Ladda om appen och att alla meddelanden rendreras.

###### Lista med meddelanden
![](https://github.com/simonolander/konferenschatten/blob/master/screenshots/ul-list-render.png "Men det ser ganska trist ut fortfarande")

Du har kanske märkt att du får varningar i konsollen.
Det beror på att vi har genererat en rad `<li>`-element utan att förse dem med en unik `key`, eller någon nyckel alls för den delen.
Du kan ignorera varningen för stunden.
###### Varning: Unique key
![](https://github.com/simonolander/konferenschatten/blob/master/screenshots/warning-key-prop.png "Vi kommer att lösa det här så småning om")





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
