import React, { Component } from 'react'
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

export default MessageInput
