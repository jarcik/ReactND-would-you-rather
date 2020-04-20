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

    handleOptionOne = (e) => {
        const optionOne = e.target.value

        this.setState({optionOne})
    }

    handleOptionTwo = (e) => {
        const optionTwo = e.target.value

        this.setState({optionTwo})
    }

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

        if(toHome === true) {
            return <Redirect to='/' />
        }
        const leftOne = 280 - optionOne.length;
        const leftTwo = 280 - optionTwo.length;

        return (
            <div>
                <h3>Would you rather...?</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <textarea
                            placeholder="Option one"
                            value={optionOne}
                            onChange={this.handleOptionOne}
                            maxLength={280}
                        />
                        {leftOne <= 100 && (
                            <div>
                                {leftOne}
                            </div>
                        )}
                    </div>

                    <div>
                        <textarea
                            placeholder="Option two"
                            value={optionTwo}
                            onChange={this.handleOptionTwo}
                            maxLength={280}
                        />
                        {leftTwo <= 100 && (
                            <div>
                                {leftTwo}
                            </div>
                        )}
                    </div>
                    <button
                        type='submit'
                        disabled={optionOne === ''}>
                        Submit
              </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewQuestion)