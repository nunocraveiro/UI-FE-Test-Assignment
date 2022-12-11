import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();

    const handleLogoClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        navigate('/devices');
    }

    const handleLogoutClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <section className='header'>
            <div className="logo" onClick={handleLogoClick}></div>
            <h2 className='devicesTitle'>Devices</h2>
            <p className='authorDevName'>Name</p>
            <button onClick={handleLogoutClick}>Log out</button>
        </section>
    )
}

export default Header;