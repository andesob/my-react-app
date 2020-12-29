import React, { Component } from 'react';
import hash from "../hash";
import "../Styles/Player.css";


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            isLoading: false,
            item: {
                album: {
                    images: [{ url: "" }]
                },
                name: "",
                artists: [{ name: "" }],
                duration_ms: 0
            },
            is_playing: "Paused",
            progress_ms: 0,
            no_data: false,
        };

        this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        // Set token
        let _token = hash.access_token;

        if (_token) {
            // Set token
            this.setState({
                token: _token
            });
            this.getCurrentlyPlaying(_token);
        }
        console.log(_token);

        // set interval for polling every 5 seconds
        this.interval = setInterval(() => this.tick(), 5000);
    }

    tick() {
        if (this.state.token) {
            this.getCurrentlyPlaying(this.state.token);
        }
    }

    getCurrentlyPlaying(_token) {
        fetch('https://api.spotify.com/v1/me/player', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + _token
            })
        })
            .then(results => {
                return results.json();
            })
            .then(data => {
                this.setState({
                    item: data.item,
                    is_playing: data.is_playing,
                    progress_ms: data.progress_ms,
                    no_data: false
                })
            })
    }


    render() {
        const client_id = encodeURIComponent('4b0271ca6abb4bdca5018dabdf98d6a9');
        const responseType = encodeURIComponent('token');
        const redirect = encodeURIComponent('http://localhost:3000');
        const showDialogue = encodeURIComponent('true');
        const scopes = encodeURIComponent('user-read-currently-playing user-read-playback-state');

        const progressBarStyles = {
            width: (this.state.progress_ms * 100 / this.state.item.duration_ms) + '%'
        };

        const backgroundStyles = {
            backgroundImage: this.state.item.album.images[0]
        };

        if (!this.state.isLoading) {
            return (
                <div>
                     {!this.state.token && (
                    <a className='btn' href={`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${responseType}&redirect_uri=${redirect}&show_dialog=${showDialogue}&scope=${scopes}`}>LOGINHER</a>
                    )}
                    <div className="App">
                        <div className="main-wrapper">
                            <div className="now-playing__img">
                                <img src={this.state.item.album.images[0].url} />
                            </div>
                            <div className="now-playing__side">
                                <div className="now-playing__name">{this.state.item.name}</div>
                                <div className="now-playing__artist">
                                    {this.state.item.artists[0].name}
                                </div>
                                <div className="now-playing__status">
                                    {this.state.is_playing ? "Playing" : "Paused"}
                                </div>
                                <div className="progress">
                                    <div className="progress__bar" style={progressBarStyles} />
                                </div>
                            </div>
                            <div className="background" style={backgroundStyles} />{" "}
                        </div>
                    </div>
                </div >
            );
        } else {
            return (
                <div>
                    Loading information
                </div>
            )
        }

    }
}

export default Header;