import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import styles from '../Styles/Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { click: false };
      }

    render() {
        return (
            <header className={styles.headerClass}>
                <div className='headerDiv'>
                    <div className='headerText'>
                        WELCOME TO MY PAGE
                    </div>

                    <div className='menu-icon' onClick={e => this.setState({
                        click: !this.state.click
                    }) }>
                        Change click: {this.state.click.toString()}
                    </div>
                </div>
                <nav className={this.state.click ? 'shown' : 'hidden'} 
                onClick={e => this.setState({
                    click: !this.state.click
                }) }>       
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