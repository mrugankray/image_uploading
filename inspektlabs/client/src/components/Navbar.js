import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { logout } from '../actions/auth'
import { connect } from 'react-redux'
import './Navbar.css';

function Navbar({auth:{isAuthenticated, loading}, logout}) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
        setButton(false);
        } else {
        setButton(true);
        }
    };

    const guestLinks = (
        <Fragment>
            <li className='nav-item'>
                <Link to='/register' className='nav-links' onClick={closeMobileMenu} style={{ textDecoration: 'none' }}>
                    Register
                </Link>
            </li>
            <li className='nav-item'>
                <Link
                    to='/login'
                    className='nav-links'
                    style={{ textDecoration: 'none' }}
                    onClick={closeMobileMenu}
                >
                Login
                </Link>
            </li>
        </Fragment>
    )

    const authLinks = (
        <Fragment>
            <li className='nav-item'>
                <Link
                    to='/upload'
                    className='nav-links'
                    style={{ textDecoration: 'none' }}
                    onClick={closeMobileMenu}
                >
                Upload
                </Link>
            </li>
            <li className='nav-item'>
                <Link
                    to='/display'
                    className='nav-links'
                    style={{ textDecoration: 'none' }}
                    onClick={() => {
                        closeMobileMenu()
                    }}
                >
                Uploaded Pic
                </Link>
            </li>
            <li className='nav-item'>
                <a
                    className='nav-links'
                    style={{ textDecoration: 'none' }}
                    onClick={() => {
                        closeMobileMenu()
                        logout()
                    }}
                >
                Logout
                </a>
            </li>
        </Fragment>
    )

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                <div className='navbar-logo' onClick={closeMobileMenu}>
                    MRay
                </div>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    {!loading&&(<Fragment>{isAuthenticated?authLinks:guestLinks}</Fragment>)}
                </ul>
                </div>
            </nav>
        </>
    );
}

const mapStateToProp = state => ({
    auth: state.auth
})

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

export default connect(mapStateToProp ,{logout})(Navbar);
