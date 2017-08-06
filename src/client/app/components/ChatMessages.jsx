import React, { Component } from 'react'
import ChatMessage from './ChatMessage'
import { Button, FormControl, HelpBlock } from 'react-bootstrap'
import FormGroup from 'react-bootstrap/es/FormGroup'
import InputGroup from 'react-bootstrap/es/InputGroup'
import axios from 'axios'

const username = 'Simon'
const imageUrl = 'https://s-media-cache-ak0.pinimg.com/originals/b1/bb/ec/b1bbec499a0d66e5403480e8cda1bcbe.png'

class ChatMessages extends Component {

  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
    this.postMessage = this.postMessage.bind(this)
    this.getMessages = this.getMessages.bind(this)
    this.getLatestId = this.getLatestId.bind(this)
    this.clearError = this.clearError.bind(this)

    this.state = {
      text: '',
      messages: [],
      error: undefined
    }
  }

  componentDidMount () {
    this.getMessages()
      .then(messages => this.setState({ messages }, this.scrollToBottom))
  }

  updateMessages (messages, callback) {
    this.setState(oldState => ({ messages: oldState.messages.concat(messages) }), callback)
  }

  clearError () {
    if (this.state.error) {
      this.setState({ error: undefined })
    }
  }

  getLatestId () {
    const messages = this.state.messages
    return messages.length
      ? messages[messages.length - 1].id
      : 0
  }

  getMessages (id='') {
    return axios.get(`http://localhost:8080/rest/messages?id=${id}`)
      .then(response => response.data)
      .catch(console.error)
  }

  postMessage (message) {
    return axios.post('http://localhost:8080/rest/messages', message)
      .then(() => this.getMessages(this.getLatestId()).then(messages => this.updateMessages(messages, this.scrollToBottom)))
      .catch(console.error)
  }

  scrollToBottom () {
    this.messages.scrollTop = this.messages.scrollHeight
  }

  onSubmit (event) {
    const text = event.target.text.value
    if (!text) {
      !this.state.error && this.setState({error: 'Cannot post empty messages'})
    }
    else {
      const message = {
        username,
        text,
        imageUrl
      }
      this.postMessage(message)
    }

    event.preventDefault()
    event.target.reset()
  }

  render () {
    const { messages, error } = this.state
    console.log("Render")

    const messagesStyle = {
      overflowY: 'scroll',
      height: '90%',
      margin: '10px 0px',
      padding: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: '10px'
    }

    return (
      <div>
        <div style={messagesStyle} ref={element => this.messages = element}>
          {messages.map(message => <ChatMessage key={message.id} {...message} />)}
        </div>
        <form onSubmit={this.onSubmit} >
          <FormGroup validationState={error && 'error'}>
            <InputGroup>
              <FormControl
                className='col-md-10'
                type='text'
                onChange={this.clearError}
                name='text'
                autoFocus
              />
              <InputGroup.Button>
                <Button type='submit' >Submit</Button>
              </InputGroup.Button>
            </InputGroup>
            {error && <HelpBlock>{error}</HelpBlock>}
          </FormGroup>
        </form>
      </div>
    )
  }
}

export default ChatMessages
