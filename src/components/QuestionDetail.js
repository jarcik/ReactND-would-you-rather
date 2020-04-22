import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/shared';
import { Redirect } from 'react-router-dom';

class QuestionDetail extends Component {

    state = {
        answer: ''
    }

    radioChange = (e) => {
        this.setState({
            answer: e.target.value
        });
    }

    submit = (e) => {
        e.preventDefault();
        console.log(this.state.answer);
        this.props.answerQuestion(this.props.quest.id, this.state.answer);
    }

    getPercent = (votes, totalVotes) => {
        return ((votes / totalVotes) * 100).toFixed(1);
    }

  render() {      
    if(!this.props.quest) {
      return <Redirect to='/not-found' />
    }

    const { quest, userAnswer, author } = this.props;
    const totalVotes = quest.optionOne.votes.length + quest.optionTwo.votes.length;
    const optionOneVotes = userAnswer === null ? 0 : this.getPercent(quest.optionOne.votes.length, totalVotes);
    const optionTwoVotes = userAnswer === null ? 0 : this.getPercent(quest.optionTwo.votes.length, totalVotes);

    console.log(this.props);

    if (!quest) {
      return <Redirect to='/not-found' />
    }
     
    return (
        <div className="card text-white bg-info mb-3" id="whole-container">
          <div className="card-header">
            {author.name} asks:
          </div>
          <div className="card-body">
              <img src={author.avatarURL} alt={`Avatar of ${author.name}`} width="150"/>
              <span className="card-text">Would you rather</span>
              <form>
                  <div>
                      <input type="radio" id="optionOne" name="option" value="optionOne" onChange={this.radioChange} disabled={userAnswer ? "disabled" : ""} checked={userAnswer === "optionOne" || this.state.answer === "optionOne"} />
                      <label htmlFor="optionOne">{quest.optionOne.text} {userAnswer ? "(" + quest.optionOne.votes.length + " votes)" : ""}</label>
                  </div>
                  <div>
                      <input type="radio" id="optionTwo" name="option" value="optionTwo" onChange={this.radioChange} disabled={userAnswer ? "disabled" : ""} checked={userAnswer === "optionTwo" || this.state.answer === "optionTwo"} />
                      <label htmlFor="optionTwo">{quest.optionTwo.text} {userAnswer ? "(" + quest.optionTwo.votes.length + " votes)" : ""}</label>
                  </div>
                  {userAnswer
                    ? '' : <button type='submit' name='submit' className="btn btn-warning" onClick={this.submit}>Submit</button>}
                  {userAnswer ?
                      <div>
                        <div className="progress">
                          <div className="progress-bar bg-warning" role="progressbar" style={{width: optionOneVotes+ "%"}} aria-valuenow={optionOneVotes} aria-valuemin="0" aria-valuemax="100">{optionOneVotes}%</div>
                          <div className="progress-bar bg-danger" role="progressbar" style={{width: optionTwoVotes+ "%"}} aria-valuenow={optionTwoVotes} aria-valuemin="0" aria-valuemax="100">{optionTwoVotes}%</div>
                        </div>
                        <span>Total votes: {totalVotes}</span>
                      </div> : ''}
              </form>
            </div>
          </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  const quest = questions[id];
  if(!quest) return {};
  const userAnswer = users[authedUser].answers[id];
  const author = users[quest.author];
  return {
    authedUser,
    quest,
    userAnswer,
    author
  }
}

function mapDispatchToProps(dispatch) {
    return {
        answerQuestion: (qid, answer) => {
        dispatch(handleAnswerQuestion(qid, answer))
      }
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail)