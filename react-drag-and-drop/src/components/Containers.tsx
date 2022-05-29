import update from 'immutability-helper'
import React, { FC, memo, useCallback, useState } from "react"
import { useDrop } from 'react-dnd';
import { ContainerBlock } from './Container';
import { ItemTypes } from './ItemTypes';

export interface ContainerProps {
    id: string
    text: string
    moveCard: (id: string, to: number) => void
    findCard: (id: string) => { index: number }
  }
  
export const Containers: FC = memo(() => {
    const [containers, setContainers] = useState<{id: number, title: string}[]>([
        {id: 1, title: "container1"},
        {id: 2, title: "container2"}
    ]);

    const findContainer = useCallback(
        (id: string) => {
          const container = containers.filter((c) => `${c.id}` === id)[0] as {
            id: number
            title: string
          }
          return {
            container,
            index: containers.indexOf(container),
          }
        },
        [containers],
      )

      const moveContainer = useCallback(
        (id: string, atIndex: number) => {
          const { container, index } = findContainer(id)
          setContainers(
            update(containers, {
              $splice: [
                [index, 1],
                [atIndex, 0, container],
              ],
            }),
          )
        },
        [findContainer, containers, setContainers],
      )

      const [, drop] = useDrop(() => ({ accept: ItemTypes.CONTAINER }))


      return (
        <div ref={drop} className="container_list">  
        {containers.map((con) => (
            <ContainerBlock
            key={con.id}
            conId={`${con.id}`}
            conTitle={con.title}
            moveContainer={moveContainer}
            findContainer={findContainer}
            />
        ))}
        </div>
      )

})