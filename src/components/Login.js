import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

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
    return (
        <form>
            <select onChange={this.changeUser} value={this.state.userId}>
              <option value="" disabled>Select a user</option>
                {
                  this.props.users && Object.keys(this.props.users).map((user) => (
                        <option key={user} value={user}>{this.props.users[user].name}</option>
                    ))
                }
            </select>
            
            <input disabled={this.state.userId === ''} type="submit" value="Submit" onClick={this.submit} />
        </form>
    );
  }
}

function mapStateToProps ({ users }) {
  console.log(users);
  return {
    users
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