import React from 'react';
import { useLocation, Switch, Route, Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {

    const location = useLocation();
    function handleLinkClick(){
        if (location.pathname === '/') { 
            props.onSignOut();
        }
    }

    return (
        <header className="header page__borders">
            <img className="header__logo" src={logo} alt="Логотип проекта Mesto" />
            <Switch>
                <Route exact path={'/'}>
                    <p className='header__link'>{props.email}</p>
                    <Link to='/sign-in' className='header__link' onClick={handleLinkClick}>Выйти</Link>
                </Route>
                <Route path={'/sign-in'}>
                    <Link to='/sign-up' className='header__link'>Регистрация</Link>
                </Route>
                <Route path={'/sign-up'}>
                    <Link to='/sign-in' className='header__link'>Войти</Link>
                </Route>
            </Switch>
        </header>
    )
}

export default Header;