import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import logo from '../images/logo.svg';
function Header(props) {




    return (
        <header className="header page__borders">
            <img className="header__logo" src={logo} alt="Логотип проекта Mesto" />
            <Switch>
                <Route exact path={'/'}>
                    <p className='header__link'>{props.email}</p>
                    <Link to='/signin' className='header__link'>Выйти</Link>
                </Route>
                <Route path={'/signin'}>
                    <Link to='/signup' className='header__link'>Регистрация</Link>
                </Route>
                <Route path={'/signup'}>
                    <Link to='/signin' className='header__link'>Войти</Link>
                </Route>

            </Switch>

        </header>
    )
}

export default Header;