import React, { Component } from 'react'
import ChatMessage from './ChatMessage'
import { Button, FormControl, HelpBlock } from 'react-bootstrap'
import FormGroup from 'react-bootstrap/es/FormGroup'
import InputGroup from 'react-bootstrap/es/InputGroup'

const username = 'Simon'

class ChatMessages extends Component {

  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)

    this.state = {
      text: '',
      messages: [],
      messageId: 1,
      error: undefined
    }
  }

  scrollToBottom () {
    this.messages.scrollTop = this.messages.scrollHeight
  }

  onSubmit (event) {
    const text = this.state.text
    if (!text) {
      this.setState({error: 'Cannot post empty messages'})
    }
    else {
      this.setState(oldState => ({
        text: '',
        messages: oldState.messages.concat([
          {
            id: oldState.messageId + 1,
            username: username,
            text: oldState.text,
          }
        ]),
        error: undefined,
        messageId: oldState.messageId + 1
      }), this.scrollToBottom)
    }

    event.preventDefault()
  }

  render () {
    const { messages, text, error } = this.state

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
        <form>
          <FormGroup validationState={error && 'error'}>
            <InputGroup>
              <FormControl
                className='col-md-10'
                type='text'
                value={text}
                onChange={e => this.setState({ text: e.target.value, error: undefined })}
              />
              <InputGroup.Button>
                <Button type='submit' onClick={this.onSubmit} >Submit</Button>
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
