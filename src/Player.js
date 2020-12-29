import React from "react";
import hash from "./hash";
import "./Styles/Player.css";

function Player(props) {

    function handlePlayClick() {
        let _token = hash.access_token;
        console.log("TOKEN HERE " + _token);
        if (props.is_playing) {
            fetch('https://api.spotify.com/v1/me/player/pause', {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': 'Bearer ' + _token
                })
            })
        } else if (!props.is_playing) {
            fetch('https://api.spotify.com/v1/me/player/play', {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': 'Bearer ' + _token
                })
            })
        }
    }

    function handleSkipClick(next) {
        let _token = hash.access_token;
        if (next) {
            fetch('https://api.spotify.com/v1/me/player/next', {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + _token
                })
            })
        } else if (!next) {
            fetch('https://api.spotify.com/v1/me/player/previous', {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + _token
                })
            })
        }
    }

    function handleNextClick(){
        handleSkipClick(true);
    }

    function handlePreviousClick(){
        handleSkipClick(false);
    }

    const backgroundStyles = {
        backgroundImage: `url(${props.item.album.images[0].url})`,
    };

    const progressBarStyles = {
        width: (props.progress_ms * 100 / props.item.duration_ms) + '%'
    };

    return (
        <div className="App">
            <div className="main-wrapper">
                <div className="now-playing__img">
                    <img src={props.item.album.images[0].url} />
                </div>
                <div className="now-playing__side">
                    <div className="now-playing__name">{props.item.name}</div>
                    <div className="now-playing__artist">
                        {props.item.artists[0].name}
                    </div>
                    <div className="now-playing__status">
                        {props.is_playing ? "Playing" : "Paused"}
                    </div>
                    <div className="progress">
                        <div className="progress__bar" style={progressBarStyles} />
                    </div>
                    <div className="buttons">
                        <button onClick={handlePreviousClick} className='previousSong'>Previous</button>
                        <button onClick={handlePlayClick} className={props.is_playing ? "pauseBtn" : "playBtn"} type="button">{props.is_playing ? "Pause" : "Play"}</button>
                        <button onClick={handleNextClick} className='nextSong'>Next</button>
                    </div>
                </div>
                <div className="background" style={backgroundStyles} />{" "}
            </div>
        </div>
    );
}

export default Player;