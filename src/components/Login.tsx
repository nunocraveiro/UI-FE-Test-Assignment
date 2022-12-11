import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-default.svg';
import './Login.css'

const Login = () => {
    const navigate = useNavigate();

    const handleLoginClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/devices');
    }

    return (
        <div className="login">
            <img src={logo} alt='logo' />
            <h1 className='loginTitle'>Log in to Your UI Employee Account</h1>
            <input className='emailInput' type='text' placeholder='Email or Username'/>
            <input className='pwInput' type='password' placeholder='Password'/>
            <p>Forgot password?</p>
            <button onClick={handleLoginClick}>Log in</button>
        </div>
    )
}

export default Login;