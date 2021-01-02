import React, { Component } from 'react';
import "../Styles/Swipe/swipe.css";
import Card from "../Components/Swipe/card";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Like from '../Components/Swipe/like-zone';
import Dislike from '../Components/Swipe/dislike-zone';


class Swiper extends Component {

    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <div className="grid-container">
                    <Like></Like>
                    <Dislike></Dislike>
                    <div className="flex-container">
                        <div className="card-list">
                            <Card></Card>
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
                </div>
            </DndProvider>
        )
    }
}

export default Swiper;