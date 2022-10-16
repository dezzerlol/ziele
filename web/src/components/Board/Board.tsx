import { Box, ScrollArea } from '@mantine/core'
import useColumns from 'hooks/useColumns'
import Column from './Column'
import CreateColumnButton from './CreateColumnButton'

const Board = () => {
  const { data, loading, error } = useColumns(1)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  let columns = data.getProjectColumns

  return (
    <ScrollArea type='always' scrollbarSize={18} offsetScrollbars style={{ width: '100%', height: '100%' }}>
      <Box sx={{ width: 1200, height: '100%', display: 'flex', gap: '10px' }}>
        {columns.map((column: any) => (
          <Column column={column} key={column.id} />
        ))}
        <CreateColumnButton />
      </Box>
    </ScrollArea>
  )
}

export default Board
