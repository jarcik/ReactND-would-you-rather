import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notSetAuthedUser } from '../actions/authedUser';
import { withRouter } from 'react-router-dom';

class User extends Component {

  //log out the user
  logOut = (e) => {
    e.preventDefault();
    this.props.logOut();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="flex">
        <span className="user-name">{this.props.user.name}</span>
        <img className="user-avatar" src={this.props.user.avatarURL} alt={`Avatar of ${this.props.user.name}`} width="50" />
        <button type="button" id="logout" onClick={this.logOut} className="btn btn-info">LogOut</button>
      </div>
    );
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    user : users[authedUser]
  }
}


function mapDispatchToProps(dispatch) {
  return {
    logOut: () => {
      dispatch(notSetAuthedUser())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User))