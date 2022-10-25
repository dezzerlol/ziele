import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Box, Button, Group } from '@mantine/core'
import { useUiStore } from 'store/uiStore'
import { ColumnType } from 'types/ziele'
import DraggableIssueCard from '../DraggableIssueCard'
import ColumnDropdown from './ColumnDropdown'
import ColumnHeader from './ColumnHeader'

const Column = ({ column }: {column: ColumnType}) => {
  const { isCreateIssueModalOpen, toggleCreateIssueModal } = useUiStore((state) => ({
    isCreateIssueModalOpen: state.isCreateIssueModalOpen,
    toggleCreateIssueModal: state.toggleCreateIssueModal,
  }))
  const { setNodeRef } = useDroppable({
    id: column.id,
  })

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
          <Box ref={setNodeRef} sx={{ borderRadius: '5px', height: 'auto', minHeight: '300px' }}>
            {column.cards.map((card: any) => (
              <DraggableIssueCard key={card.id} card={card} />
            ))}
            <Button onClick={() => toggleCreateIssueModal(true)} fullWidth variant='subtle'>
              Add new card
            </Button>
          </Box>
        </SortableContext>
      </Box>
    </>
  )
}

export default Column
