import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Message from './Message'

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

MessageList.propTypes = {
  messages: PropTypes.array
}

MessageList.defaultProps = {
  messages: []
}

export default MessageList
