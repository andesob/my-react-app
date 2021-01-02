import React, { Component } from 'react';
import "../Styles/swipe.css";
import logo from "./../logo512.png";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

class Swiper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <div className="flex-container">
                    <div className="card-list">
                        <div className="card">
                            <img className="card-image" key="1" src={logo} alt={"1"}></img>
                            <div className="card-name">
                                <p>
                                    katte
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="button-container">

                        <button className="dislike-button">
                            Misliker
                        </button>
                        <button className="like-button">
                            Liker
                        </button>
                    </div>
                </div>
            </DndProvider>
        )
    }
}

export default Swiper;