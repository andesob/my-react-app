import React, { Component } from "react";
import hash from "./hash";
import './Styles/searchbar.css';


class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: null,
            no_data: true,
            items: [{
                name: "",
                uri: "",
                artistName: ""
            }]
        }

        this.searchSongs = this.searchSongs.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.songChosen = this.songChosen.bind(this);
    }

    searchSongs() {
        let _token = hash.access_token;

        const query = encodeURIComponent(this.state.inputValue);
        const type = encodeURIComponent('track');
        const limit = encodeURIComponent('10');
        fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=${limit}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + _token
            })
        })
            .then(results => {
                return results.json();
            })
            .then(data => {
                if (!data) {
                    this.setState({
                        no_data: true
                    });
                    return;
                }

                this.setState({
                    no_data: false,
                    items: data.tracks.items.map(item => ({
                        name: item.name,
                        uri: item.uri,
                        artistName: item.artists[0].name
                    }))
                })
            })

        console.log(this.state.items)
    }

    inputChange(newValue) {
        this.setState({
            inputValue: newValue.target.value
        })
    }

    songChosen(song) {
        let _token = hash.access_token;
        fetch(`https://api.spotify.com/v1/me/player/queue?uri=${song}`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + _token
            })
        })
        this.setState({
            no_data: true,
            inputValue: ""
        })
    }

    render() {
        return (
            <div className='searchbarMainDiv'>
                <div className='wrapper'>
                    <input
                        className='inputField'
                        placeholder={"Search songs"}
                        onChange={evt => this.inputChange(evt)}
                        value={this.state.inputValue}></input>
                    <button className='searchBtn' onClick={this.searchSongs}>
                        Search
                    </button>
                    <div className={this.state.no_data ? 'emptysonglist' : 'songlist'}>
                        {this.state.items.map(item => <div key={item.uri} onClick={evt => this.songChosen(item.uri)}> {item.name} - {item.artistName} </div>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Searchbar;