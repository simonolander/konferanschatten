import React, { Component } from 'react'
import { render } from 'react-dom'
import MessageList from './components/MessageList'
import MessageInput from './components/MessageInput'
import axios from 'axios'

const url = 'http://ec2-54-201-62-210.us-west-2.compute.amazonaws.com:8080/rest/messages'
// const url = 'http://localhost:8080/rest/messages'

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

  componentDidMount () {
    this.loadMessages()
    this.messageRefreshHandler = setInterval(this.loadLatestMessages, 10000)
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

render(<App/>, document.getElementById('app'));
