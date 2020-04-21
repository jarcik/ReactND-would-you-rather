import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Question extends Component {

  viewPoll = (e) => {
    e.preventDefault();
    this.props.history.push('/questions/'+ this.props.quest.id);

  }

  render() {
    console.log(this.props);
    const { quest, author } = this.props;
    const optionOne = quest.optionOne.text.split(' ');
    return (
      <div className="card text-white bg-info mb-3">
        <div className="card-header">
          {author.name} asks:
        </div>
        <div className="card-body">
          <img src={author.avatarURL} alt={`Avatar of ${author.name}`} width="150"/>
          <span className="card-text">Would you rather</span>
          <span className="card-text"> {optionOne[0] + ' ' + (optionOne[1] ? optionOne[1] : '')} ...</span>
          <button type='button' className="btn btn-warning" onClick={this.viewPoll}>View Poll</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }, {question}) {
  const quest = questions[question];
  const author = users[quest.author];
  return {
    authedUser,
    quest,
    author
  }
}

export default withRouter(connect(mapStateToProps)(Question))