import React, { Component } from 'react'
import Image from 'react-bootstrap/es/Image'

class Loader extends Component {
  render () {
    return (
      <Image width={128} src="public/images/fidget-spinner.gif" className="img-responsive center-block" style={{ marginTop: '50%' }}/>
    )
  }
}

export default Loader
