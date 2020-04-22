import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeaderBoard extends Component {

  render() {
    const users = this.props.sortedUsers;
      
    return (
      <div id="whole-container">
        {users.map((user) => 
            <div key={user.id} className="card text-white bg-info mb-3 leaderboard-card">                
                <div className="card-body">
                  <img src={user.avatarURL} alt={`Avatar of ${user.name}`} width="150" />
                  <span className="name">{user.name}</span>
                  <span>Answered questions: {Object.keys(user.answers).length}</span>
                  <span>Questions created: {user.questions.length}</span>
                  <span className="score">{Object.keys(user.answers).length + user.questions.length}</span>
                </div>
            </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  //sorted users by their score to leaderboard view
  const sortedUsers = Object.values(users).sort((a,b) => (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length));
  return {
    authedUser,
    sortedUsers
  }
}

export default connect(mapStateToProps)(LeaderBoard)