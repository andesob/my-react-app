import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styles from '../Styles/Header.module.css';

class Header extends Component {
    render() {
        return (
            <header className={styles.headerClass}>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Homepage</Link>
                        </li>
                        <li>
                            <Link to='/Hotmilfsinmyarea'>Hoes</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;