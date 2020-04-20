import React, { Component } from 'react';
import { connect } from 'react-redux'

class User extends Component {
  render() {
    return (
      <div>
        <img src={this.props.user.avatarURL} alt={`Avatar of ${this.props.user.name}`}/>
        <span>{this.props.user.name}</span>
      </div>
    );
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    user : users[authedUser]
  }
}


export default connect(mapStateToProps)(User)