import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/shared';

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
    const { quest, userAnswer, author } = this.props;
    const totalVotes = quest.optionOne.votes.length + quest.optionTwo.votes.length;
    const optionOneVotes = userAnswer === null ? 0 : this.getPercent(quest.optionOne.votes.length, totalVotes);
    const optionTwoVotes = userAnswer === null ? 0 : this.getPercent(quest.optionTwo.votes.length, totalVotes);

    console.log(this.props);

    if (quest === null) {
        return <p>This question do not exist</p>
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
                      <input type="radio" id="optionOne" name="option" value="optionOne" onChange={this.radioChange} disabled={userAnswer !== null ? "disabled" : ""} checked={userAnswer === "optionOne"} />
                      <label htmlFor="optionOne">{quest.optionOne.text} {userAnswer !== null ? "(" + quest.optionOne.votes.length + " votes)" : ""}</label>
                  </div>
                  <div>
                      <input type="radio" id="optionTwo" name="option" value="optionTwo" onChange={this.radioChange} disabled={userAnswer !== null ? "disabled" : ""} checked={userAnswer === "optionTwo"} />
                      <label htmlFor="optionTwo">{quest.optionTwo.text} {userAnswer !== null ? "(" + quest.optionTwo.votes.length + " votes)" : ""}</label>
                  </div>
                  {userAnswer === null 
                    && <button type='submit' name='submit' className="btn btn-warning" onClick={this.submit}>Submit</button>}
                  {userAnswer !== null &&
                      <div>
                        <div className="progress">
                          <div className="progress-bar bg-warning" role="progressbar" style={{width: optionOneVotes+ "%"}} aria-valuenow={optionOneVotes} aria-valuemin="0" aria-valuemax="100">{optionOneVotes}%</div>
                          <div className="progress-bar bg-danger" role="progressbar" style={{width: optionTwoVotes+ "%"}} aria-valuenow={optionTwoVotes} aria-valuemin="0" aria-valuemax="100">{optionTwoVotes}%</div>
                        </div>
                        <span>Total votes: {totalVotes}</span>
                      </div>}
              </form>
            </div>
          </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  const quest = questions[id];
  const userAnswer = (id in users[authedUser].answers) ? users[authedUser].answers[id] : null;
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