import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeaderBoard extends Component {

  render() {
      const users = this.props.sortedUsers;
    return (
      <div>
        {users.map((user) => 
            <div key={user.id}>                
                <img src={user.avatarURL} alt={`Avatar of ${user.name}`}/>
                <span>{user.name}</span>
                <span>Answered questions: {Object.keys(user.answers).length}</span>
                <span>Questions created: {user.questions.length}</span>
                <span>Score: {Object.keys(user.answers).length + user.questions.length}</span>
            </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
    const sortedUsers = Object.values(users).sort((a,b) => (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length));
  return {
    authedUser,
    sortedUsers
  }
}

export default connect(mapStateToProps)(LeaderBoard)