import React, { Component } from 'react';
import { connect }  from 'react-redux';
import { handleAddQuestion } from '../actions/shared';
import { Redirect } from 'react-router-dom';

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false
    }

    //change of the texatrea for option one
    handleOptionOne = (e) => {
        const optionOne = e.target.value;
        this.setState({optionOne});
    }

    //change of the texatrea for option two
    handleOptionTwo = (e) => {
        const optionTwo = e.target.value;
        this.setState({optionTwo});
    }

    //submit new question
    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOne, optionTwo } = this.state;
        const { dispatch } = this.props;

        dispatch(handleAddQuestion(optionOne, optionTwo));

        this.setState(() => ({
            optionOne: '',
            optionTwo: '',
            toHome: true
        }))
    }

    render() {
        const { optionOne, optionTwo, toHome } = this.state

        //submitted question - redurect to home page
        if(toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div id="whole-container" className="bg-info card new-question">
            <div className="card-header text-white">
                Would you rather...?
            </div>
            <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="optionOne">Option one</label>
                        <textarea
                            className="form-control"
                            placeholder="Option one"
                            value={optionOne}
                            onChange={this.handleOptionOne}
                            maxLength={280}
                            id="optionOne"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="optionTwo">Option one</label>
                        <textarea
                            className="form-control"
                            placeholder="Option two"
                            value={optionTwo}
                            onChange={this.handleOptionTwo}
                            maxLength={280}
                            id="optionTwo"
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={optionOne === ''}
                        className="btn btn-warning">
                        Submit
              </button>
                </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
      authedUser
    }
  }
  
export default connect(mapStateToProps)(NewQuestion)