import React, { Component } from 'react';
import hash from "../hash";
import Player from '../Player';
import Searchbar from '../Searchbar';
import '../Styles/musicPage.css';


class Musicpage extends Component {
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
        console.log(_token);

        if (_token) {
            // Set token
            this.setState({
                token: _token
            });
            this.getCurrentlyPlaying(_token);
        }

        // set interval for polling every 1 seconds
        this.interval = setInterval(() => this.tick(), 1000);
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
                if (!(results.status === 200)) {
                    this.setState({
                        no_data: true,
                    });
                    return;
                }
                return results.json();
            })
            .then(data => {
                if (!data) {
                    this.setState({
                        no_data: true,
                    });
                    return;
                }
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
        const redirect = encodeURIComponent('http://158.38.101.179/Hotmilfsinmyarea');
        const showDialogue = encodeURIComponent('true');
        const scopes = encodeURIComponent('user-read-currently-playing user-read-playback-state user-modify-playback-state');


        if (!this.state.isLoading) {
            return (
                <div className='mainDiv'>
                    {!this.state.token && (
                        <a className='loginBtn' href={`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${responseType}&redirect_uri=${redirect}&show_dialog=${showDialogue}&scope=${scopes}`}>Log in with Spotify</a>

                    )}

                    {this.state.token && !this.state.no_data && (
                        <Player
                            item={this.state.item}
                            is_playing={this.state.is_playing}
                            progress_ms={this.state.progress_ms}
                        />
                    )}

                    {this.state.token && !this.state.no_data && (
                        <Searchbar></Searchbar>
                    )}

                    {this.state.no_data && (
                        <p>
                            SPILL AV MUSIKK FOR FAEN
                        </p>
                    )}
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

export default Musicpage;