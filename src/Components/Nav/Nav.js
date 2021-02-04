import React from 'react';
import './Nav.css';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setIsLoggedOut, logOutClearProducts } from '../../store/actions';

const Nav = (props) => {

    const userLogOutHandler = ()=>{
        props.onSetIsLoggedOut();
        props.onLogOutClearProducts();
        localStorage.clear();
        props.history.push('/');
    };

    const userLoggedIn = (
        <>
        <li><NavLink to='/addProducts'> Add Products </NavLink></li>
        <li><NavLink to='/products'> Products </NavLink></li>
        <li><h3>Hi {props.userDetails.name}</h3><button onClick={userLogOutHandler}> Logout </button></li>
        </>
    );

    const userLoggedOut = (
        <>
        <li><NavLink to='/'> Home </NavLink></li>
        <li><NavLink to='/'> Login </NavLink></li>
        </>
    );


    return (
        <div className='Nav'>
            <ul className='navigation-ul'>
               {props.loggedIn ? userLoggedIn : userLoggedOut }
            </ul>
        </div>
    );
};

const mapStateToProps =(state)=> {
    return {
        userDetails: state.userDetails,
        loggedIn: state.loggedIn
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSetIsLoggedOut: ()=>{ dispatch( setIsLoggedOut())},
        onLogOutClearProducts:()=>{dispatch(logOutClearProducts())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Nav));
