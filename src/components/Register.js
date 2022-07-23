import React from 'react';
import { Link, withRouter } from 'react-router-dom';

//import logo from '../images/logo.svg';


function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value)
    };
    function handlePasswordChange(e) {
        setPassword(e.target.value)
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(email, password);
    }

    return (
        <div className='access'>
            <form className='access__form' onSubmit={handleSubmit}>
                <h2 className='access__header'>Регистрация</h2>
                <input className='access__input'
                    name="email" type='email'
                    placeholder='Email' required
                    value={email} onChange={handleEmailChange} />
                <input className='access__input'
                    name='password' type='password'
                    placeholder='Пароль' required
                    value={password} onChange={handlePasswordChange} />
                <button className="access__button" type="submit">Зарегистрироваться</button>
            </form>
            <p className='access__caption'>Уже зарегистрированы?
                <Link to='signin' className='access__link'> Войти</Link>
            </p>
        </div>
    )


}
export default withRouter(Register);