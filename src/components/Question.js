import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Question extends Component {

  viewPoll = (e) => {
    e.preventDefault();
    this.props.history.push('/question/'+ this.props.quest.id);

  }

  render() {
    console.log(this.props);
    const { quest, author } = this.props;
    const optionOne = quest.optionOne.text.split(' ');
    return (
      <div>
        <div>
          {author.name} asks:
        </div>
        <div>
          <div>
            <span>Would you rather</span>
            <img src={author.avatarURL} alt={`Avatar of ${author.name}`}/>
            <span> {optionOne[0] + ' ' + (optionOne[1] ? optionOne[1] : '')} ...</span>
            <button type='button' onClick={this.viewPoll}>View Poll</button>
          </div>
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