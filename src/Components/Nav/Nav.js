import React from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <div className='Nav'>
            <ul className='navigation-ul'>
                <li><NavLink to='/'> Home </NavLink></li>
                <li><NavLink to='/addProducts'> Add Products </NavLink></li>
                <li><NavLink to='/products'> Products </NavLink></li>
                <li><NavLink to='/'> Login </NavLink></li>
                <li><button> Logout </button></li>
            </ul>
        </div>
    );
}

export default Nav;
