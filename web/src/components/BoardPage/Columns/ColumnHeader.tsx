import { Group, Title } from '@mantine/core'
import React from 'react'
import { ColumnType } from 'types/ziele'

const ColumnHeader = ({ column }: {column: ColumnType}) => {
  return (
    <Group>
      <Title
        order={6}
        color='gray.7'
        contentEditable
        spellCheck='false'
        sx={{ cursor: 'pointer', '&:focus': { outline: 'none', textDecoration: 'underline' } }}>
        {column.title}
      </Title>
      <Title order={6} color='gray.7'>
        {column.cards.length}
      </Title>
    </Group>
  )
}

export default ColumnHeader
