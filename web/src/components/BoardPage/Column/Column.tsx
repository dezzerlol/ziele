import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Box, Button, Group } from '@mantine/core'
import { useUiStore } from 'store/uiStore'
import { ColumnType } from 'types/ziele'
import DraggableIssueCard from '../Card/DraggableIssueCard'
import ColumnDropdown from './ColumnDropdown'
import ColumnHeader from './ColumnHeader'

const Column = ({ column }: { column: ColumnType }) => {
  const { toggleCreateIssueModal, setClickedColumnId } = useUiStore((state) => ({
    toggleCreateIssueModal: state.toggleCreateIssueModal,
    setClickedColumnId: state.setClickedColumnId,
  }))

  const { setNodeRef } = useDroppable({
    id: column.id,
  })

  const handleOpen = () => {
    toggleCreateIssueModal(true)
    setClickedColumnId(column.id)
  }

  return (
    <>
      <Box
        p='xs'
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          width: '100%',
          minHeight: '100%',
          height: '100%',
          backgroundColor: '#F5F7FB',
          borderRadius: '5px',
        }}>
        <Group spacing='xs' mb='md' position='apart' align='center' sx={{ height: '5%' }}>
          <ColumnHeader column={column} />
          <ColumnDropdown id={column.id} />
        </Group>

        <SortableContext items={column.cards.map((card: any) => card.id)} strategy={verticalListSortingStrategy}>
          <Box ref={setNodeRef} sx={{ borderRadius: '5px', height: 'auto', minHeight: '280px' }}>
            {column.cards.map((card: any) => (
              <DraggableIssueCard key={card.id} card={card} />
            ))}
            <Button onClick={handleOpen} fullWidth variant='subtle'>
              Add new card
            </Button>
          </Box>
        </SortableContext>
      </Box>
    </>
  )
}

export default Column
