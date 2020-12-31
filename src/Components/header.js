import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../Styles/Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            click: false,
            likedCats: []
        };
        this.changeMenuState = this.changeMenuState.bind(this);
    }

    componentDidMount() {
        var cats = JSON.parse(localStorage.getItem('LikedCats'));
        if (cats != null) {
            this.setState({
                likedCats: cats.map(cat => ({
                    id: cat.id,
                    url: cat.url
                }))
            })
        }
        console.log(this.state.likedCats)
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
                            <Link to={{
                                pathname: '/',
                                state: {
                                    likedCats: this.state.likedCats
                                },
                            }}>Homepage</Link>
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