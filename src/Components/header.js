import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../Styles/Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { click: false };
        this.changeMenuState = this.changeMenuState.bind(this);
    }

    changeMenuState() {
        this.setState({
            click: !this.state.click
        });
    }

    render() {
        return (
            <header className={styles.headerClass}>
                <div className='headerDiv'>
                    <div className='headerText'>
                        WELCOME TO MY PAGE
                    </div>

                    <div className='menu-icon' onClick={this.changeMenuState}>
                        MENU
                    </div>
                </div>
                <nav className={this.state.click ? 'shown' : 'hidden'}
                    onClick={this.changeMenuState}>
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