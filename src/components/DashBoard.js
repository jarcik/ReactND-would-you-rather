import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class DashBoard extends Component {
  state = {
    tab: 'unanswered'
  };

  toggle = (tab) => {
    this.setState({ tab : tab });
  }

  render() {
    return (
      <div id="whole-container">
        <ul className="nav nav-tabs justify-content-center">
            <li className="nav-item"><a className={"nav-link" + (this.state.tab === "unanswered" ? ' active' : '')} onClick={() => this.toggle('unanswered')}>Unanswered</a></li>
            <li className="nav-item"><a className={"nav-link" + (this.state.tab === "answered" ? ' active' : '')} onClick={() => this.toggle('answered')}>Answered</a></li>
        </ul>

        <div id={this.state.tab} className="tab-content">
          {this.state.tab === 'answered' && this.props.answeredQuestions.map(question =>
            <Question key={question} question={question} />
          )}
          {this.state.tab === 'unanswered' && this.props.unansweredQuestions.map(question =>
            <Question key={question} question={question} />
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  
  const answeredQuestions = Object.keys(users[authedUser].answers)
  .sort((a,b) => questions[b].timestamp - questions[a].timestamp);

  const unansweredQuestions = Object.keys(questions)
  .filter((key) => !answeredQuestions.includes(key))
  .sort((a,b) => questions[b].timestamp - questions[a].timestamp);

  console.log(answeredQuestions);
  console.log(unansweredQuestions);
  return {
    authedUser,
    answeredQuestions,
    unansweredQuestions
  }
}

export default connect(mapStateToProps)(DashBoard)