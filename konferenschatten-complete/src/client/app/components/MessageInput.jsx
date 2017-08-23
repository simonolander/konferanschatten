import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

export default MessageInput
