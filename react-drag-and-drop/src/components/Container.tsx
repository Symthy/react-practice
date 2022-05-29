import update from 'immutability-helper'
import type { FC } from 'react'
import React, { memo, useCallback, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { Card } from './Card'
import { ITEMS } from './items'
import { ItemTypes } from './ItemTypes'

const style = {
  width: 400,
}

export interface ContainerState {
  cards: {
    id: number;
    text: string;
  }[]
}

export interface ContainerProps {
  conId: string
  conTitle: string
  moveContainer: (id: string, to: number) => void
  findContainer: (id: string) => { index: number }
}


export const ContainerBlock: FC<ContainerProps> = memo(({
    conId,
    conTitle,
    moveContainer,
    findContainer,
  }) => {
  const [cards, setCards] = useState(ITEMS)

  const findCard = useCallback(
    (id: string) => {
      const card = cards.filter((c) => `${c.id}` === id)[0] as {
        id: number
        text: string
      }
      return {
        card,
        index: cards.indexOf(card),
      }
    },
    [cards],
  )

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findCard(id)
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        }),
      )
    },
    [findCard, cards, setCards],
  )

  const originalIndex = findContainer(conId).index
  const [{ isDragging }, condrag] = useDrag( 
    () => ({
      type: ItemTypes.CONTAINER,
      item: { conId, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(), 
      }),
      end: (item, monitor) => {
        const { conId: droppedId, originalIndex: conOriginalIndex } = item
        const didDrop = monitor.didDrop() 
        if (!didDrop) {
          moveContainer(droppedId, conOriginalIndex) 
        }
      },
    }),
    [conId, originalIndex, moveContainer],
  )

  interface ConItem {
    conId: string
    originalIndex: number
  }
  const [, condrop] = useDrop( 
    () => ({
      accept: ItemTypes.CARD,
      hover({ conId: draggedId }: ConItem) {
        if (draggedId !== conId) {
          const { index: overIndex } = findContainer(conId)
          moveCard(draggedId, overIndex)
        }
      },
    }),
    [findContainer, moveContainer],
  )

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD })) 
  return (
    <div ref={(node) => condrag(condrop(node))}> 
      <div>{conTitle}</div>
      <div ref={drop} style={style}>  
        {cards.map((card) => (
          <Card
            key={card.id}
            id={`${card.id}`}
            text={card.text}
            moveCard={moveCard}
            findCard={findCard}
          />
        ))}
      </div>
    </div>
  )
})
