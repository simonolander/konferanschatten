import React, { Component } from 'react'
import ChatMessage from './ChatMessage'
import { Button, FormControl, HelpBlock } from 'react-bootstrap'
import FormGroup from 'react-bootstrap/es/FormGroup'
import InputGroup from 'react-bootstrap/es/InputGroup'

class ChatMessages extends Component {

  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      text: "",
      messages: [],
      messageId: 1,
      error: undefined
    }
  }

  onSubmit (event) {
    const text = this.state.text
    if (!text) {
      this.setState({error: "Cannot post empty messages"})
    }
    else {
      this.setState(oldState => ({
        text: '',
        messages: oldState.messages.concat([
          {
            id: oldState.messageId + 1,
            text: oldState.text,
          }
        ]),
        error: undefined,
        messageId: oldState.messageId + 1
      }))
    }

    event.preventDefault()
  }

  render () {
    const { messages, text, error } = this.state

    return (
      <div>
        <ul>
          {messages.map(message => <ChatMessage key={message.id} {...message} />)}
        </ul>
        <form>
          <FormGroup validationState={error && "error"}>
            <InputGroup>
              <FormControl
                className="col-md-10"
                type="text"
                value={text}
                onChange={e => this.setState({ text: e.target.value, error: undefined })}
              />
              <InputGroup.Button>
                <Button type="submit" onClick={this.onSubmit} >Submit</Button>
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
