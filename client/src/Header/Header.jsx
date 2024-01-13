import './Header.css';

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { authContext } from '../context/authContext';

import SearchComponent from './Search';

function Header() {
    const { auth, onLogout } = useContext(authContext);
    return (
        <nav>
            <ul>
                {!auth ?
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                    :
                    <>
                        <li><Link to="/">chatRoom</Link></li>
                        <li><SearchComponent /></li>
                        <li><Link to="/catalog">Catalog</Link></li>
                        <li onClick={onLogout}><Link to="/logout">Logout</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                    </>
                }
            </ul>
        </nav>
    );
}

export default Header;

