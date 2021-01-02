import React from 'react';
import "./../../Styles/Swipe/card.css"
import logo from "./../../logo512.png";
import { useDrag } from 'react-dnd';

export const ItemTypes = {
    CARD: 'card'
}
function Card() {

    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.CARD },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
    return (
        <div className="card" ref={drag}
            style={{
                opacity: isDragging ? 0.0 : 1,
                //background: isDragging ? "#3c3c3c" : "#000000",
                fontSize: 25,
                fontWeight: 'bold',
                cursor: 'move',
            }}
        >
            <img className="card-image" key="1" src={logo} alt={"1"} draggable="false"></img>
            <div className="card-name">
                <p>
                    Pusekatt
                </p>
            </div>
        </div>
    )
}


export default Card;