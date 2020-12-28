import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Header extends Component {
    render() {
        return (
            <header>
                <div>
                    isthislive?
            </div>
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