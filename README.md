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
##### Vad har ändrats?
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
##### Vad har ändrats?
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
##### Vad har ändrats?
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

### Utsidan räknas
Hittills har vi bara byggt funktionalitet och vår applikation ser ganska spartansk ut. Låt oss ändra på det. 
[Bootstrap](https://react-bootstrap.github.io/getting-started.html) är ett javascipt/css-bibliotek med stöd för React.
###### Installera `react-bootstrap`
```
npm install react-bootstrap --save
```
Vi behöver även lägga till tre css-filer i vår `index.html` och sätta `className` på de taggar som vi vill snygga upp.
###### index.html
```html
<meta charset="utf-8">
  <title>Konferenschatten, R2M 2017</title>

  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
  <!-- Optional theme -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css">
  <!-- Vår custom css -->
  <link rel="stylesheet" href="public/css/main.css">
</head>
```
###### index.jsx
```jsx harmony
<div className='app row'>
  <div className='col-xs-6 col-xs-offset-3'>
    <MessageList
      messages={this.state.messages}
    />
    <MessageInput
      onSubmit={this.postMessage.bind(this)}
    />
  </div>
</div>
```
###### MessageList.jsx
```jsx harmony
<div className='message-list'>
  {this.props.messages.map(text => <li>{text}</li>)}
</div>
```
Vi ska ta och göra något åt input-fältet också. 
På https://react-bootstrap.github.io/components.html hittar vi exempel på deras komponenter och hur vi kan använda dem.
Vi kommer att använda deras `Form`-komponent, med tillhörande komponenter.

###### MessageInput.jsx
```jsx harmony
import { Button, Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap'

class MessageInput extends Component {

  onSubmit (event) {
    const text = event.target.text.value
    event.preventDefault()
    event.target.reset()

    this.props.onSubmit(text)
  }

  render () {
    return (
    <Form onSubmit={this.onSubmit.bind(this)}>
      <FormGroup>
        <InputGroup>
          <FormControl
            className='col-md-10'
            name='text'
            autoFocus
          />
          <InputGroup.Button>
            <Button type='submit'>Skicka</Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    </Form>
    )
  }
}
```
Ladda om sidan och se hur det ser ut.

### Upritning av meddelanden
Vi har fortfarande inte gjort någon ansträngning för att rita upp själva meddelandet. 
I en bra chat-app vill man inte endast se vad som skrivits, utan också vem som skrivit vad.
I Bootstrap finns det en komponent vid namn `Media` som passar våra ändamål

###### Message.jsx
```jsx harmony
import PropTypes from 'prop-types'
import { Media } from 'react-bootstrap'

class Message extends Component {

  render () {
    return (
      <Media className='message'>
        <Media.Body>
          <Media.Heading>{this.props.username}</Media.Heading>
          <p>{this.props.text}</p>
        </Media.Body>
      </Media>
    )
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  username: PropTypes.string
}

Message.defaultProps = {
  username: 'Anonym'
}
```

##### Vad har ändrats?
1. Vi har importerat `Media` från `react-bootstrap` och använt dess komponenter för att rita upp vårt meddelande.
2. Vi har importerat `PropTypes` från `prop-types` för att kunna speca vilka props vi förväntar oss.
3. Vi har definierat en ny prop, `username`, där vi kan skriva vem som skrev meddelandet.
4. Vi har specat två statiska variabler `propTypes` och `defaultProps` på vår klass.
   1. `propTypes` låter oss berätta vilka `props` som en komponent förväntar sig, vilka typer de har, och huruvida de är required. 
   Om en required prop saknas under runtime så genereras en varning.
   2. `defaultProps` låter oss definiera default-värden för våra props, ifall de inte är satta av föräldern.

### Vem skrev vad?
Vi har gjort så att `Message` ritar upp `username` om det kommer in från props, men inte skickat in något än.
`username` är en del av ett meddelande, så vi borde pakettera både `text` och `username` i samma objekt.

###### index.jsx
```jsx harmony
postMessage (text) {
  const message = {
    text: text,
    username: 'Simon'
  }
  
  this.setState({
    messages: this.state.messages.concat(message)
  })
}
```
##### Vad har ändrats?
1. Istället för att spara `messages` som en lista med strängar sparar vi dem som objekt med flera värden.
2. Vi har defaultat `username` till något hårdkodat värde tills vidare.

###### MessageList.jsx
```jsx harmony
import PropTypes from 'prop-types'
import Message from './Message'

class MessageList extends Component {

  render () {
    return (
      <div className='message-list'>
        {this.props.messages.map(message => <Message {...message} />)}
      </div>
    )
  }
}

MessageList.propTypes = {
  messages: PropTypes.array
}

MessageList.defaultProps = {
  messages: []
}
```
##### Vad har ändrats?
1. Vi har ändrat så att `messages` innehåller message-objekt istället för bara text.
`{...message}` är es6 och låter oss packa upp ett objekt och skicka dess innehåll som separata props.
2. Vi har specat `propTypes` för den här klassen också.

### Fler saker i meddelandet
Vad vill man ha i meddelandet förutom text och användarnamn? Tidpunkt för meddelandet och en bild på användaren kanske.
Låt oss lägga till det i `index.jsx` och `Message.jsx`.

###### index.jsx
```jsx harmony
const message = {
  text: text,
  username: 'Simon',
  timestamp: + new Date()
}
```
##### Vad har ändrats?
1. Vi har lagt till `timestamp` i message-objektet, det plockas lättast ut i javascript genom `+ new Date()`.

###### Message.jsx
```jsx harmony
import { Image, Media } from 'react-bootstrap'

class Message extends Component {

  render () {
    return (
      <Media className='message'>
        <Media.Left>
          <Image
            width={56}
            height={56}
            src={this.props.imageUrl}
            circle
          />
        </Media.Left>
        <Media.Body>
          <Media.Heading>{this.props.username} <small>{this.props.timestamp}</small></Media.Heading>
          <p>{this.props.text}</p>
        </Media.Body>
      </Media>
    )
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  username: PropTypes.string,
  imageUrl: PropTypes.string,
  timestamp: PropTypes.number
}

Message.defaultProps = {
  username: 'Anonym',
  imageUrl: 'public/images/anon.png',
  timestamp: 0
}
```
##### Vad har ändrats?
1. Vi har importerat `Image` från `react-bootstrap` och använt komponenten för att rita upp en avatar till vänster om meddelandet.
2. Vi har defaultat `imageUrl` till någon default-bild.
3. Vi ritar nu ut `timestamp` bredvid användarnamnet.

Ladda om appen och se hur det ser ut.
###### Bild och timestamp
![](https://github.com/simonolander/konferenschatten/blob/master/screenshots/image-and-timestamp.png "Det börjar ta sig, eller hur?")

## Online
Det är inte mycket av en chat om man bara pratar med sig själv. I nästa steg ska vi koppla ihop appen med en server.
För att sköta kommunikationen smidigt kommer vi att använda ett bibliotek som heter [Axios](https://github.com/mzabriskie/axios).
```commandline
npm install axios --save
```
När vi laddar sidan vill vi hämta alla meddelanden från servern, när vi skapar ett meddelande vill vi skicka det till servern,
och vi vill periodiskt hämta alla nya meddelanden från servern.

Vi börjar med att hämta och skicka.
```jsx harmony
import axios from 'axios'

const url = 'http://ec2-54-201-62-210.us-west-2.compute.amazonaws.com:8080/rest/messages'

class App extends Component {

  constructor (props) {
    super(props)
    
    this.loadMessages = this.loadMessages.bind(this)

    this.state = {
      messages: []
    }
  }

  componentDidMount () {
    this.loadMessages()
  }

  loadMessages () {
    axios.get(url)
      .then(response => response.data)
      .then(messages => this.setState({messages}))
      .catch(console.error)
  }

  postMessage (text) {
    const message = {
      text: text,
      username: 'Simon',
      imageUrl: 'public/images/cow.png'
    }

    axios.post(url, message)
      .then(response => response.data)
      .then(this.loadMessages)
      .catch(console.error)
  }

  render () {
    return (
      <div className='app row'>
        <div className='col-xs-6 col-xs-offset-3'>
          <MessageList
            messages={this.state.messages}
          />
          <MessageInput
            onSubmit={this.postMessage.bind(this)}
          />
        </div>
      </div>
    )
  }
}
```
##### Vad har ändrats?
1. Vi har importerat `axios` från `axios`. Paketet låter oss enkelt göra rest-anrop till vår server.
2. Vi har specat en `url` variable med addressen till vår server.
3. Vi har skapat en ny metod `loadMessages` som hämtar alla meddelanden från servern och sparar dem i `state`.
Vi har även `bind`at den i konstruktorn, så att vi slipper göra det varje gång den anropas.
4. Vi har ändrat `postMessage` så att den skickar meddelandet till servern, och sedan hämtar alla nya meddelanden.
5. Vi har implementerat `componentDidMount` som körs efter första rendreringen av vår komponent.
Den sköter hämtningen av alla meddelanden första gången.

Ladda om sidan och se att ni kan chatta med varandra! Och var varsamma med servern!

Vi ska också se till att det sker en löpande hämtning av nya meddelanden. 
Det sker genom att vi berättar för servern vilket vårt senaste meddelande id är, 
så att servern bara behöva skicka meddelanden som dykt upp efteråt.
```jsx harmony
class App extends Component {

  constructor (props) {
    super(props)
    
    this.loadMessages = this.loadMessages.bind(this)
    this.loadLatestMessages = this.loadLatestMessages.bind(this)

    this.state = {
      messages: []
    }
  }

  componentDidMount () {
    this.loadMessages()
    this.messageRefreshHandler = setInterval(this.loadLatestMessages, 3000)
  }

  componentWillUnmount () {
    if (this.messageRefreshHandler) {
      clearInterval(this.messageRefreshHandler)
    }
  }

  loadMessages () {
    axios.get(url)
      .then(response => response.data)
      .then(messages => this.setState({messages}))
      .catch(console.error)
  }

  loadLatestMessages () {
    const { messages } = this.state
    const length = messages.length
    const latestId = length
      ? messages[length - 1].id
      : 0

    return axios.get(`${url}?id=${latestId}`)
      .then(response => response.data)
      .then(messages => messages.length && this.setState(oldState => ({
        messages: oldState.messages.concat(messages)
      })))
      .catch(console.error)
  }

  postMessage (text) {
    const message = {
      text: text,
      username: 'Simon'
    }

    axios.post(url, message)
      .then(response => response.data)
      .then(this.loadLatestMessages)
      .catch(console.error)
  }

  render () {
    return (
      <div className='app row'>
        <div className='col-xs-6 col-xs-offset-3'>
          <MessageList
            messages={this.state.messages}
          />
          <MessageInput
            onSubmit={this.postMessage.bind(this)}
          />
        </div>
      </div>
    )
  }
}
```
##### Vad har ändrats?
1. Vi har skapat en ny metod `loadLatestMessages` som frågar servern efter de meddelanden efter ett visst id.
Här ser vi en ny typ av `setState` som tar en funktion istället för ett nytt state.
I funktionen får vi det gamla statet, vilket är bra om vi har många trådar som sätter state.
På så vis kan vi undvika race conditions.
2. I `componentDidMount` så kallar vi på `setInterval` med vår metod och den frekvens vi vill ha.
Den kommer anropa metoden med jämna mellanrum, och skickar tillbaka en referens till "tråden".
3. `componentWillUnmount` är en annan livscykelmetod i react som körs när komponenten plockas bort.
4. Vi har ändrat `postMessage` så att den också använder `getLatestMessages`.

### Unique `key` prop
Under hela labben vi fått varningen `Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of MessageList`.
React använder keys för att hålla koll på när komponenter läggs till, tas bort, och ändras. 
En key är bara ett unikt id för en komponent bland sina syskon, och viktig när vi rendrerar många komponenter parallellt,
som vi gör i `MessageList`. Praktiskt för oss är att alla meddelanden har ett unikt id som sätts av servern.
Vi tar och skickar med det när vi instantierar `Message`.

###### MessageList.jsx
```jsx harmony
render () {
  return (
    <div className='message-list'>
      {this.props.messages.map(message => <Message key={message.id} {...message} />)}
    </div>
  )
}
```
Kontrollera att varningarna är borta.

### Timestamp
Vi har haft vår timestamp bredvid namnet ett tag nu. Det skulle vara fint om det faktiskt stog ett datum där.
Det finns ett paket vid namn [Moment](https://momentjs.com/) som sköter datum och tidsformattering på ett juste sätt.

```commandline
npm install moment --save
```
###### Message.jsx
```jsx harmony
import moment from 'moment'

moment.locale('sv')

class Message extends Component {

  render () {
    return (
      <Media className='message'>
        <Media.Left>
          <Image
            width={56}
            height={56}
            src={this.props.imageUrl}
            circle
          />
        </Media.Left>
        <Media.Body>
          <Media.Heading>{this.props.username} <small>{moment(this.props.timestamp).calendar()}</small></Media.Heading>
          <p>{this.props.text}</p>
        </Media.Body>
      </Media>
    )
  }
}
```

### Autoscroll
Vid det här laget har ni säkert märkt att vi manuellt behöver scrolla listan för att se nya meddelanden.
Vi skulle vilja att listan autoscrollade till botten när det kommer in nya meddelanden.
Det borde dock bara ske om listan redan är i botten, annars får vi svårt att läsa gamla meddelanden.

###### MessageList.jsx
```jsx harmony
class MessageList extends Component {

  constructor (props) {
    super(props)
    this.onScroll = this.onScroll.bind(this)
    this.scrolledToBottom = true
  }

  componentDidUpdate () {
    if (this.scrolledToBottom) {
      this.scrollToBottom()
    }
  }

  onScroll () {
    this.scrolledToBottom = this.list.scrollHeight - this.list.scrollTop === this.list.clientHeight
  }

  scrollToBottom () {
    this.list.scrollTop = this.list.scrollHeight
  }

  render () {
    return (
      <div onScroll={this.onScroll} ref={element => this.list = element} className='message-list'>
        {this.props.messages.map(message => <Message key={message.id} {...message} />)}
      </div>
    )
  }
}
```
##### Vad har ändrats?
1. Vi har lagt till en ny metod `componentDidUpdate`. Den anropas efter varje omrendrering av komponenten. 
I vårt fall kommer komponenten bara att ritas om när vi skickar in nya meddelanden.
Om vi precis var i botten på listan vill vi scrolla till botten igen efter omrendreringen.
2. Vi skickar med `onScroll` till vår div. Varje gång det sker en scroll kollar vi om vi numera är i botten på listen.
3. Vi skickar även med en funktion i `ref`. När vår div rendrerats kommer vi att spara undan en referens till den.
4. I konstruktorn sätter vi `scrolledToBottom` till sant, då vi vill börja med listan i botten.

Kolla att listan beter sig som vi vill.

###### Disable when posting
Ni har kanske upptäckt att vi kan skicka iväg flera meddelanden innan vi får tillbaka svar från servern.
Det är dåligt dels för att man lätt kan spamma chatten, 
och dels för att vi skapar race conditions när vi har flera request i luften samtidigt.

Låt oss fixa till det.

###### index.jsx
```jsx harmony
class App extends Component {

  constructor (props) {
    super(props)
    
    this.loadMessages = this.loadMessages.bind(this)
    this.loadLatestMessages = this.loadLatestMessages.bind(this)

    this.state = {
      messages: [],
      disablePosting: false
    }
  }
  
  // ...

  postMessage (text) {
    const message = {
      text: text,
      username: 'Simon'
    }

    this.setState({
      disablePosting: true
    })

    axios.post(url, message)
      .then(response => response.data)
      .then(() => this.loadLatestMessages()
        .then(() => this.setState({ disablePosting: false })))
      .catch(error => {
        this.setState({ disablePosting: false })
        console.error(error)
      })
  }

  render () {
    return (
      <div className='app row'>
        <div className='col-xs-6 col-xs-offset-3'>
          <MessageList
            messages={this.state.messages}
          />
          <MessageInput
            onSubmit={this.postMessage.bind(this)}
            disabled={this.state.disablePosting}
          />
        </div>
      </div>
    )
  }
}
```
##### Vad har ändrats?
1. Vi har lagt till en ny state-variable `disablePosting` som håller koll på huruvida vi ska tillåta nya meddelanden.
2. I början på `postMessage` sätter vi `disablePosting` till `true`, och i slutet av posten så sätter vi den till `false` igen.
Det kan ske på två sätt, antingen när `loadLatestMessage` är klar, eller om posten misslyckas.
3. Vi skickar med `disablePosting` till `MessageInput`

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
    <Form onSubmit={this.onSubmit.bind(this)}>
      <FormGroup>
        <InputGroup>
          <FormControl
            key={this.props.disabled}
            className='col-md-10'
            name='text'
            disabled={this.props.disabled}
            autoFocus
          />
          <InputGroup.Button>
            <Button disabled={this.props.disabled} type='submit'>Skicka</Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    </Form>
    )
  }
}

MessageInput.propTypes = {
  disabled: PropTypes.bool
}

MessageInput.defaultProps = {
  disabled: false
}
```
##### Vad har ändrats?
1. Vi har lagt till `disabled` som en ny property, och defaultat den till `false`.
2. Vi skickar i sin tur vidare `disabled` till både `FormControl` och `Button`.
3. Vi låter äver nyckeln till `FormControl` bero på `disabled` p.g.a. en feature i hur autoFocus fungerar.

## Om vi har tid

### Små saker att göra
1. Ge alla användare en egen färg på användarnamnet
2. Hindra användare `MessageInput` från att posta tomma meddelanden
3. Gör en loader
4. GUI för att byta användarnamn och bild

### Stora saker att göra
1. Reactions!
2. Trådar!
3. Scroll into view!
4. Gifar
