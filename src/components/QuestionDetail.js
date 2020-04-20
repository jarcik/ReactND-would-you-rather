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
        return (votes / totalVotes) * 100;
    }

  render() {      
    const { quest, userAnswer, author } = this.props;
    const totalVotes = quest.optionOne.votes.length + quest.optionTwo.votes.length;

    console.log(this.props);

    if (quest === null) {
        return <p>This question do not exist</p>
    }
     
    return (
        <div>
        <div>
          {author.name} asks:
        </div>
        <div>
            <img src={author.avatarURL} alt={`Avatar of ${author.name}`}/>
          <div>
            <span>Would you rather</span>
            {userAnswer === null 
            && <form>
                <div>
                    <input type="radio" id="optionOne" name="option" value="optionOne" onChange={this.radioChange} />
                    <label htmlFor="optionOne">{quest.optionOne.text}</label>
                </div>
                <div>
                    <input type="radio" id="optionTwo" name="option" value="optionTwo" onChange={this.radioChange} />
                    <label htmlFor="optionTwo">{quest.optionTwo.text}</label>
                </div>
                <button type='submit' name='submit' onClick={this.submit}>Submit</button>
            </form>}
            
            {userAnswer !== null 
            && <div>
                <div>
                    <span>{quest.optionOne.text}</span>
                    <span>{quest.optionTwo.text}</span>
                    <span>{this.getPercent(quest.optionOne.votes.length, totalVotes)}% vs {this.getPercent(quest.optionTwo.votes.length, totalVotes)}%</span>
                    <span>Total votes: {totalVotes}</span>
                </div>
            </div>}
          </div>
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