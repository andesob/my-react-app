import React from 'react';
import "../Styles/likedcats.css"

function LikedCatsPage(props) {
    function renderImage(imgUrl) {
        return (
                <div className="grid-element">
                    <img className="catImages" key={imgUrl} src={imgUrl} alt="FORDI JEG MÅ IGJEN"></img>
            </div>
        )
    }

    return (
        <div className="App">
            <div className="grid-container">
                {props.location.likedCats.map(cat => renderImage(cat.url))}
            </div>
        </div>
    );
}

export default LikedCatsPage;