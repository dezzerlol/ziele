import { DndContext, DragOverlay } from '@dnd-kit/core'
import { Box, Divider, ScrollArea } from '@mantine/core'
import useColumns from 'graphql/queries/useColumns'
import useDnd from 'hooks/useDnd'
import useProject from 'graphql/queries/useProject'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ColumnType } from 'types/ziele'
import BoardHeader from './BoardHeader'
import Column from './Column/Column'
import CreateColumnButton from './Column/CreateColumnButton'
import CreateIssueModal from './CreateNewModal/CreateNewModal'
import IssueCard from './Card/IssueCard'
import IssueModal from './IssueModal/IssueModal'
import { useUiStore } from 'store/uiStore'
import InviteUserModal from './InviteUserModal/InviteUserModal'

const Board = () => {
  const router = useRouter()
  const { teamTitle, projectId } = router.query
  const [columns, setColumns] = useState<ColumnType[]>([])
  const { isCreateIssueModalOpen, isInviteUserModalOpen } = useUiStore((state) => ({
    isCreateIssueModalOpen: state.isCreateIssueModalOpen,
    isInviteUserModalOpen: state.isInviteUserModalOpen,
  }))

  const { project, loading: projectLoading } = useProject(teamTitle as string, projectId as string)
  const { data, loading, error } = useColumns(router.query.teamTitle as string, router.query.projectId as string)

  const {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
    collisionDetectionStrategy,
    sensors,
    activeId,
    activeCard,
    setActiveCard,
  } = useDnd(columns, setColumns)

  useEffect(() => {
    if (!loading && !error) setColumns(data.getProjectColumns)
  }, [data])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box p='md' sx={{ backgroundColor: 'white', maxHeight: '35%', minHeight: 'auto' }}>
        <BoardHeader project={project} />
      </Box>
      <Divider />
      <Box px='sm' sx={{ minHeight: '65%', height: '100%', backgroundColor: 'white' }}>
        <ScrollArea type='auto' scrollbarSize={18} offsetScrollbars style={{ width: '100%', height: '100%' }}>
          <Box mt='md' sx={{ width: 1200, height: '100%', display: 'flex', gap: '10px' }}>
            <DndContext
              sensors={sensors}
              collisionDetection={collisionDetectionStrategy}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}>
              {columns.map((column: any) => (
                <Column column={column} key={column.id} />
              ))}
              {createPortal(
                <DragOverlay>{activeCard ? <IssueCard card={activeCard} /> : null}</DragOverlay>,
                document.body
              )}
            </DndContext>
            <CreateColumnButton id={project.id} />
          </Box>
        </ScrollArea>
      </Box>

      {isCreateIssueModalOpen && <CreateIssueModal columns={columns} project={project} />}
      {isInviteUserModalOpen && <InviteUserModal />}
      {router.query.issue && <IssueModal />}
    </Box>
  )
}

export default Board
