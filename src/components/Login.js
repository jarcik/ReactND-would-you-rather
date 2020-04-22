import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    userId: ''
  }

  changeUser = (e) => {
    console.log(e.target.value);
    this.setState({userId: e.target.value});
  }

  submit = (e) => {
    e.preventDefault();
    if (this.state.userId !== '') {
      this.props.setAuthedUser(this.state.userId);
    } else {
      alert('select who you want to login for');
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if(this.props.authedUser !== null) {
      return <Redirect to={from}/>;
    }

    return (
      <div className="card form-signin">
        <div className="card-header">
        Log in to Would you rather...? App
        </div>
        <div className="card-body">
          <form>
                  <div className="form-group">
                  <label htmlFor="user-select">Pick a user</label>
                    <select onChange={this.changeUser} value={this.state.userId} id="user-select" className="form-control">
                      <option value="" disabled>Select a user</option>
                        {
                          this.props.users && Object.keys(this.props.users).map((user) => (
                                <option key={user} value={user}>{this.props.users[user].name}</option>
                            ))
                        }
                    </select>
                  </div>
                  
                  <input disabled={this.state.userId === ''} type="submit" value="Submit" onClick={this.submit} className="btn btn-info" />
              </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ users, authedUser }) {
  console.log(users);
  return {
    users,
    authedUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthedUser: (user) => {
      dispatch(setAuthedUser(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)