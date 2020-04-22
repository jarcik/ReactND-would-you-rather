import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Nav from './Nav';
import DashBoard from './DashBoard.js';
import Login from './Login';
import QuestionDetail from './QuestionDetail';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {this.props.authedUser !== null && <Nav />}
            <Switch>
                <Route path="/login" exact component={Login}/>
                <PrivateRoute path='/' exact component={DashBoard}
                    authedUser={this.props.authedUser}/>
                <PrivateRoute path='/questions/:id' exact component={QuestionDetail}
                    authedUser={this.props.authedUser}/>
                <PrivateRoute path='/add' exact component={NewQuestion}
                    authedUser={this.props.authedUser}/>
                <PrivateRoute path='/leaderboard' exact component={LeaderBoard}
                    authedUser={this.props.authedUser}/>
                <Route path='/not-found' component={NotFound} />
            </Switch>
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