import React, { Component } from 'react'

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
        <input name='text' />
        <button>Skicka</button>
      </form>
    )
  }
}

export default MessageInput
