import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class NotFound extends Component {

  //click on the home button
  home = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="card" id="whole-container">
        <div className="card-header">
        Page not found!
        </div>
        <div className="card-body">        
            <input type="submit" value="Go home..." onClick={this.home} className="btn btn-info" />
        </div>
      </div>
    );
  }
}

export default withRouter(NotFound)