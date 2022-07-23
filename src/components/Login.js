import React from 'react';
import { Link, withRouter } from 'react-router-dom';


function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value)
    };
    function handlePasswordChange(e) {
        setPassword(e.target.value)
    };

    function handleLogin(e) {
        e.preventDefault();
        props.onLogin(email, password);
    }


    return (
        <div className='access'>
            <h2 className='access__header'>Вход</h2>
            <form className="access__form" onSubmit={handleLogin}>
                <input className='access__input'
                    name='email' type='email'
                    placeholder='Email' required
                    value={email} onChange={handleEmailChange} />
                <input className='access__input'
                    name='password' type='password'
                    placeholder='Пароль' required
                    value={password} onChange={handlePasswordChange} />
                <button className='access__button' type="submit">Войти</button>
            </form>
        </div>
    )


}
export default withRouter(Login);