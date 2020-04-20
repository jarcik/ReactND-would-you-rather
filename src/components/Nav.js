import React from 'react';
import { NavLink } from 'react-router-dom';
import User from './User';

export default function Nav () {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            LeaderBoard
          </NavLink>
        </li>
        <li>
            <User />
        </li>
      </ul>
    </nav>
  )
} 