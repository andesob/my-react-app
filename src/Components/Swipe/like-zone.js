import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './card'


function Like() {

  function handleLike() {
    alert('Liker pusekatten');
  }

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => handleLike(),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  })
  return (
    <div className="like-zone" ref={drop}>

    </div>

  )
}

export default Like;