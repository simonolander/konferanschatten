import React, { Component } from 'react';
import {render} from 'react-dom';

class App extends Component {
  render () {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          "Centered stuff there"
        </div>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
