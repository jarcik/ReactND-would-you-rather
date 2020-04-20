import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Nav from './Nav';
import DashBoard from './DashBoard.js';
import Login from './Login';
import QuestionDetail from './QuestionDetail';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    if(this.props.authedUser === null) {
      return (
        <Router>
          <Route path='/' exact component={Login} />
        </Router>
        )
    }
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            <Route path='/' exact component={DashBoard} />
            <Route path='/question/:id' component={QuestionDetail} />
            <Route path='/add' component={NewQuestion} />
            <Route path='/leaderboard' component={LeaderBoard} />
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser
  }
}

export default connect(mapStateToProps)(App)