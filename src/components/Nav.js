import React from 'react';
import { NavLink } from 'react-router-dom';
import User from './User';

export default function Nav () {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light rounded'>
    
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navBar" aria-controls="navBar" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navBar">
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <NavLink to='/' exact className='nav-link' activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/add' className='nav-link' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/leaderboard' className='nav-link' activeClassName='active'>
              LeaderBoard
            </NavLink>
          </li>
        </ul>
      </div>
      <User />
    </nav>
  )
} 