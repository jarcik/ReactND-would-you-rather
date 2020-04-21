import React, { Component } from 'react';
import { connect } from 'react-redux'

class User extends Component {
  render() {
    return (
      <div className="flex">
        <span className="user-name">{this.props.user.name}</span>
        <img src={this.props.user.avatarURL} alt={`Avatar of ${this.props.user.name}`} width="50" />
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