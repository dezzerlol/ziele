import {
  closestCenter,
  CollisionDetection,
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
import useMoveCard from 'graphql/mutations/useMoveCard'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CardType } from 'types/ziele'

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

export default function useDnd(items: any, setItems: (items: any) => void, projectId: string) {
  const { moveCard, loading } = useMoveCard()
  const recentlyMovedToNewContainer = useRef(false)
  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [activeCard, setActiveCard] = useState<CardType | null>(null)

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

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
          const containerItems = items.find((item: any) => item.id === overId)
          /*  const containerItems = items[overId].cards */

          // If a container is matched and it contains cards
          if (containerItems && containerItems.cards.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId && containerItems.cards.find((item: any) => item.id === container.id)
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
    const activeId = active.id
    const overId = over?.id

    if (overId == null) {
      return
    }

    // Find the containers
    const activeContainer = findContainer(activeId)
    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return
    }

    // Get items of active container and over container
    const activeItems = items[activeContainer].cards
    const overItems = items[overContainer].cards

    // Find the index of the active item and the over item
    let activeIndex = findIndex(activeId, activeItems)
    let overIndex = findIndex(overId, overItems)

    let newIndex
    if (findRoot(overId, items)) {
      // We're at the root droppable of a container
      newIndex = overItems.length + 1
    } else {
      const isBelowOverItem =
        over && active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
    }

    recentlyMovedToNewContainer.current = true

    let newColumnsInObj = {
      ...items,
      [activeContainer]: {
        ...items[activeContainer],
        cards: [...items[activeContainer].cards.filter((item: any) => item.id !== active.id)],
      },
      [overContainer]: {
        ...items[overContainer],
        cards: [
          ...items[overContainer].cards.slice(0, newIndex),
          items[activeContainer].cards[activeIndex],
          ...items[overContainer].cards.slice(newIndex, items[overContainer].cards.length),
        ],
      },
    }

    // New columns created as object with objects, we need to convert it to array
    let newColumns = Object.values(newColumnsInObj)

    setItems(newColumns)
  }

  function handleDragEnd({ active, over }: any) {
    const activeId = active.id
    const overId = over?.id

    if (overId == null) {
      setActiveCard(null)
      setActiveId(null)
      return
    }

    const activeContainer = findContainer(active.id)

    if (!activeContainer) {
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

    const movedCardId = items[activeContainer].cards[activeIndex].id
    const movedCardContainerId = items[activeContainer].id

    if (activeIndex !== overIndex) {
      let newColumnObj = {
        ...items,
        [overContainer]: {
          ...items[overContainer],
          cards: arrayMove(items[overContainer].cards, activeIndex, overIndex),
        },
      }
      let newColumns = Object.values(newColumnObj)
      setItems(newColumns)
    }

    moveCard(movedCardId, movedCardContainerId, projectId)

    setActiveId(null)
    setActiveCard(null)
  }

  function handleDragCancel() {
    setActiveId(null)
    setActiveCard(null)
  }

  return {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
    collisionDetectionStrategy,
    sensors,
    activeId,
    activeCard,
    setActiveCard,
  }
}
