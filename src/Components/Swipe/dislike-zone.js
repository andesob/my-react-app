import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './card'


function Dislike() {

  function handleDislike() {
    alert('liker ikke pusekatten');
  }

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => handleDislike(),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  })
  return (
    <div className="dislike-zone" ref={drop}>
    </div>

  )
}

export default Dislike;