import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Box, ScrollArea } from '@mantine/core'
import useColumns from 'hooks/useColumns'
import { useEffect, useState, useRef } from 'react'
import Column from './Column'
import CreateColumnButton from './CreateColumnButton'
import IssueCard from './IssueCard'
import IssueModal from './IssueModal'

type Card = {
  id: number
  title: string
}

type Column = {
  cards: Card[]
  id: number
  title: string
}

const Board = () => {
  const [items, setItems] = useState<Column[]>([])
  const [activeId, setActiveId] = useState<number | null>(null)
  const { data, loading, error } = useColumns(1)
  const recentlyMovedToNewContainer = useRef(false)

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 70,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    if (!loading && !error) setItems(data.getProjectColumns)
  }, [data])

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false
    })
  }, [items])

  function findContainer(id: any) {
    if (id in items) {
      return id
    }

    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < items[i].cards.length; j++) {
        if (items[i].cards[j].id === id) return `${i}`
      }
    }
  }

  function findIndex(id: any, array: any) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) return i
    }
  }

  function handleDragStart({ active }: any) {
    console.log({ active })
    setActiveId(active.id)
  }

  function handleDragOver({ active, over }: any) {
    const { id } = active
    const { id: overId } = over

    // Find the containers
    const activeContainer = findContainer(id)
    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return
    }

    setItems((prev: any): any => {
      const activeItems = prev[activeContainer].cards
      const overItems = prev[overContainer].cards

      let activeIndex = findIndex(id, activeItems) || 0
      let overIndex = findIndex(id, overItems) || 0

      let newIndex
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          active.rect.current.translated.offsetTop > over.rect.offsetTop + over.rect.height

        const modifier = isBelowLastItem ? 1 : 0

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
      }

      recentlyMovedToNewContainer.current = true

      let newColumnsInObj = {
        ...prev,
        [activeContainer]: {
          ...prev[activeContainer],
          cards: [...prev[activeContainer].cards.filter((item: any) => item.id !== active.id)],
        },
        [overContainer]: {
          ...prev[overContainer],
          cards: [
            ...prev[overContainer].cards.slice(0, newIndex),
            items[activeContainer].cards[activeIndex],
            ...prev[overContainer].cards.slice(newIndex, prev[overContainer].length),
          ],
        },
      }

      let newColumns = Object.values(newColumnsInObj)
      return newColumns
    })
  }

  function handleDragEnd({ active, over }: any) {
    const activeContainer = findContainer(active.id)

    if (!activeContainer) {
      setActiveId(null)
      return
    }

    const overId = over?.id

    if (overId == null) {
      setActiveId(null)
      return
    }

    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      return
    }

    const activeIndex = findIndex(activeId, items[activeContainer].cards) || 0
    const overIndex = findIndex(overId, items[overContainer].cards) || 0

    if (activeIndex !== overIndex) {
      setItems((items: any): any => {
        let newColumnObj = {
          ...items,
          [overContainer]: {
            ...items[overContainer],
            cards: arrayMove(items[overContainer].cards, activeIndex, overIndex),
          },
        }
        let newColumns = Object.values(newColumnObj)
        return newColumns
      })
    }

    setActiveId(null)
  }

  /* function findCard(id: string) {
    if (id === null) return
    console.log({ id })
    return { card: column.cards.find((card: any) => card.id === id) }
  } */

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  let testCard = { id: activeId, title: '' }

  return (
    <>
      <ScrollArea type='always' scrollbarSize={18} offsetScrollbars style={{ width: '100%', height: '100%' }}>
        <Box sx={{ width: 1200, height: '100%', display: 'flex', gap: '10px' }}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}>
            {items.map((column: any) => (
              <Column column={column} key={column.id} />
            ))}
            <DragOverlay>{activeId ? <IssueCard card={testCard} /> : null}</DragOverlay>
          </DndContext>
          <CreateColumnButton />
        </Box>
      </ScrollArea>
      <IssueModal />
    </>
  )
}

export default Board
