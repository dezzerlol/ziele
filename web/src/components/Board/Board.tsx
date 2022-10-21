import {
  closestCenter,
  CollisionDetection,
  DndContext,
  DragOverlay,
  getFirstCollision,
  KeyboardSensor,
  MouseSensor,
  pointerWithin,
  rectIntersection,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Box, ScrollArea } from '@mantine/core'
import useColumns from 'hooks/useColumns'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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

function findRoot(id: any, arr: any) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return true
  }

  return false
}

function findIndex(id: any, array: any) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) return i
  }

  return 0
}

const Board = () => {
  const router = useRouter()
  const [items, setItems] = useState<Column[]>([])
  const [activeId, setActiveId] = useState<number | null>(null)
  const [activeCard, setActiveCard] = useState<Card | null>(null)
  const { data, loading, error } = useColumns(router.query.teamTitle as string, router.query.projectTitle as string)
  const recentlyMovedToNewContainer = useRef(false)

  const lastOverId = useRef<UniqueIdentifier | null>(null)

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
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

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && findRoot(activeId, items)) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter((container) => findRoot(container.id, items)),
        })
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args)

      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args)
      let overId: any = getFirstCollision(intersections, 'id')

      if (overId != null) {
        if (findRoot(overId, items)) {
          const containerItems = items.find((item) => item.id === overId)
          /*  const containerItems = items[overId].cards */

          // If a container is matched and it contains cards
          if (containerItems && containerItems.cards.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) => container.id !== overId && containerItems.cards.find((item) => item.id === container.id)
              ),
            })[0]?.id
          }
        }

        lastOverId.current = overId

        return [{ id: overId }]
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeId, items]
  )

  function findContainer(id: any): any {
    // check if container is root
    for (let i = 0; i < items.length; i++) {
      if (id === items[i].id) {
        return `${i}`
      }
    }

    // check if container cards is root
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < items[i].cards.length; j++) {
        if (items[i].cards[j].id === id) return `${i}`
      }
    }
  }

  function handleDragStart({ active }: any) {
    setActiveId(active.id)
    // set active card to show in drag overlay
    const activeContainer = findContainer(active.id)
    const activeItems = items[activeContainer].cards
    let activeIndex = findIndex(active.id, activeItems) || 0
    setActiveCard(items[activeContainer].cards[activeIndex])
  }

  function handleDragOver({ active, over }: any) {
    const { id } = active
    const overId = over?.id

    if (overId == null) {
      return
    }

    // Find the containers
    const activeContainer = findContainer(id)
    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return
    }

    setItems((prev: any): any => {
      const activeItems = prev[activeContainer].cards
      const overItems = prev[overContainer].cards

      let activeIndex = findIndex(id, activeItems)
      let overIndex = findIndex(overId, overItems)

      let newIndex
      if (findRoot(overId, prev)) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0

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
            ...prev[overContainer].cards.slice(newIndex, prev[overContainer].cards.length),
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
      setActiveCard(null)
      setActiveId(null)
      return
    }

    const overId = over?.id

    if (overId == null) {
      setActiveCard(null)
      setActiveId(null)
      return
    }

    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      return
    }

    const activeIndex = findIndex(activeId, items[activeContainer].cards)
    const overIndex = findIndex(overId, items[overContainer].cards)

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
    setActiveCard(null)
  }

  function handleDragCancel() {
    setActiveId(null)
    setActiveCard(null)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <ScrollArea type='always' scrollbarSize={18} offsetScrollbars style={{ width: '100%', height: '100%' }}>
        <Box sx={{ width: 1200, height: '100%', display: 'flex', gap: '10px' }}>
          <DndContext
            sensors={sensors}
            collisionDetection={collisionDetectionStrategy}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}>
            {items.map((column: any) => (
              <Column column={column} key={column.id} />
            ))}
            {createPortal(
              <DragOverlay>{activeCard ? <IssueCard card={activeCard} /> : null}</DragOverlay>,
              document.body
            )}
          </DndContext>
          <CreateColumnButton />
        </Box>
      </ScrollArea>
      <IssueModal />
    </>
  )
}

export default Board
