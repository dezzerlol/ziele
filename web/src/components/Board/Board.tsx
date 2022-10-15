import { Box, Group, ScrollArea, Title } from '@mantine/core'
import React from 'react'

const columns = [
  {
    id: 1,
    title: 'TO DO',
    cards: [
      { id: 1, title: 'Card 1' },
      { id: 2, title: 'Card 2' },
    ],
  },
  {
    id: 2,
    title: 'Development',
    cards: [
      { id: 1, title: 'Card 1' },
      { id: 2, title: 'Card 2' },
      { id: 3, title: 'Card 2' },
      { id: 4, title: 'Card 2' },
      { id: 5, title: 'Card 2' },
      { id: 6, title: 'Card 2' },
      { id: 7, title: 'Card 2' },
    ],
  },
  {
    id: 3,
    title: 'Development',
    cards: [
      { id: 1, title: 'Card 1' },
      { id: 2, title: 'Card 2' },
    ],
  },
  {
    id: 4,
    title: 'Development',
    cards: [
      { id: 1, title: 'Card 1' },
      { id: 2, title: 'Card 2' },
    ],
  },
  {
    id: 5,
    title: 'Development',
    cards: [
      { id: 1, title: 'Card 1' },
      { id: 2, title: 'Card 2' },
    ],
  },
  {
    id: 6,
    title: 'Development',
    cards: [
      { id: 1, title: 'Card 1' },
      { id: 2, title: 'Card 2' },
      { id: 3, title: 'Card 2' },
    ],
  },
  {
    id: 7,
    title: 'Bebix',
    cards: [
      { id: 1, title: 'Card 1' },
      { id: 2, title: 'Card 2' },
      { id: 3, title: 'Card 2' },
    ],
  },
]

const Board = () => {
  return (
    <ScrollArea type='always' scrollbarSize={18} offsetScrollbars style={{ width: '100%', height: '100%' }}>
      <Box sx={{ width: 1200, height: '100%', display: 'flex', gap: '10px' }}>
        {columns.map((column) => (
          <Box
            key={column.id}
            sx={{ minWidth: '300px', maxWidth: '300px', width: '100%', minHeight: '100%', height: '100%' }}>
            <Group spacing='xs' mb='md' sx={{ height: '5%' }}>
              <Title order={6} mb='sm'>
                {column.title}
              </Title>
              <Title order={6} mb='sm'>
                4
              </Title>
            </Group>
            <Box p='xs' sx={{ border: '1px solid lightgray', borderRadius: '5px', height: 'auto' }}>
              {column.cards.map((card) => (
                <Box key={card.id}>{card.title}</Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </ScrollArea>
  )
}

export default Board
