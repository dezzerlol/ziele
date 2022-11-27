import TagSelectItem from '@components/Select/Tags/TagSelectItem'
import TagSelectValue from '@components/Select/Tags/TagSelectValue'
import { Box, Button, Divider, Group, Modal, MultiSelect, ScrollArea, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { ISSUE_TYPES } from 'constant/issueTypes'
import { PRIORITIES } from 'constant/priorities'
import useCreateCard from 'graphql/mutations/useCreateCard'
import dynamic from 'next/dynamic'
import React, { useMemo, useState } from 'react'
import { RiUser3Line } from 'react-icons/ri'
import { useUiStore } from 'store/uiStore'
import { ColumnType, ProjectType } from 'types/ziele'
import SelectItem from '../../Select/WithIcon/SelectItem'
import SelectValue from '../../Select/WithIcon/SelectValue'
import { FileDropzone } from './FileDropzone'
import NewTagModal from './NewTagModal'
const DescriptionEditor = dynamic(() => import('./DescriptionEditor'), { ssr: false, loading: () => null })

interface Props {
  columns: ColumnType[]
  project: ProjectType
}

const getNewCardIndex = (columns: ColumnType[], columnId: string) => {
  const usedColumn = columns.find((column) => column.id === columnId)

  return usedColumn!.cards.length + 1
}

const CreateNewModal = ({ columns, project }: Props) => {
  const [isNewTagOpen, setIsNewTagOpen] = useState(false)
  const { mutate, loading } = useCreateCard()
  const { isCreateModalOpen, toggleCreateNewModal, clickedColumnId, setClickedColumnId } = useUiStore((state) => ({
    isCreateModalOpen: state.isCreateIssueModalOpen,
    clickedColumnId: state.clickedColumnId,
    toggleCreateNewModal: state.toggleCreateIssueModal,
    setClickedColumnId: state.setClickedColumnId,
  }))

  const form = useForm({
    initialValues: {
      issueType: 'task',
      columnId: clickedColumnId,
      title: '',
      description: '',
      priority: '',
      assignees: [],
      tags: [],
      /* files: '', */
    },
  })

  const handleReset = () => {
    form.reset()
    toggleCreateNewModal(false)
    setClickedColumnId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const index = getNewCardIndex(columns, form.values.columnId as string)
    await mutate({ variables: { data: { ...form.values, index } } })
    handleReset()
  }

  const formattedColumns = useMemo(
    () => columns.map((column) => ({ value: column.id, label: column.title })),
    [columns]
  )
  const users = useMemo(
    () => project.users.map((user: any) => ({ value: user.id, label: user.username, icon: <RiUser3Line /> })),
    [project.users]
  )
  const tags = useMemo(
    () => project.tags.map((tag) => ({ value: tag.id, label: tag.body, color: tag.color })),
    [project.tags]
  )


  return (
    <>
      <Modal
        opened={isCreateModalOpen}
        withCloseButton={false}
        onClose={handleReset}
        size='xl'
        padding={20}
        title='Create issue'>
        <ScrollArea.Autosize maxHeight='700px' offsetScrollbars={true} type='auto'>
          <Box p='sm' component='form' onSubmit={handleSubmit}>
            <Box pb='xl'>
              <Select
                label='Issue type'
                itemComponent={SelectItem}
                data={ISSUE_TYPES}
                {...form.getInputProps('issueType')}
                icon={ISSUE_TYPES.find((i) => i.value === form.values.issueType)?.icon}
              />
            </Box>
            <Box pb='xl'>
              <Select
                label='Column'
                data={formattedColumns}
                itemComponent={SelectItem}
                {...form.getInputProps('columnId')}
                required
                styles={{ label: { display: 'flex', gap: '2px' } }}
              />
            </Box>
            <Divider color='var(--border-color)' />
            <Box pt='xl'>
              <TextInput
                label='Short summary'
                {...form.getInputProps('title')}
                required
                styles={{ label: { display: 'flex', gap: '2px' } }}
                placeholder='Concisely summarize the issue in one or two sentences.'
              />
            </Box>
            <Box pt='xl'>
              <DescriptionEditor />
            </Box>
            <Box pt='xl'>
              <MultiSelect
                label='Assignees'
                placeholder='Start typing or pick one...'
                valueComponent={SelectValue}
                itemComponent={SelectItem}
                data={users}
                {...form.getInputProps('assignees')}
                searchable
              />
            </Box>
            <Box pt='xl'>
              <MultiSelect
                label='Tags'
                placeholder='Start typing or pick one...'
                valueComponent={TagSelectValue}
                itemComponent={TagSelectItem}
                data={tags}
                {...form.getInputProps('tags')}
                searchable
                nothingFound={
                  <Button variant='white' onClick={() => setIsNewTagOpen(true)}>
                    Create new tag
                  </Button>
                }
              />
            </Box>
            <Box pt='xl'>
              <Select
                itemComponent={SelectItem}
                label='Priority'
                data={PRIORITIES}
                icon={PRIORITIES.find((i) => i.value === form.values.priority)?.icon}
                {...form.getInputProps('priority')}
                placeholder='Pick one...'
              />
            </Box>
            <Box pt='xl'>
              <FileDropzone />
            </Box>
            <Group pt={40} position='right'>
              <Button variant='white' onClick={handleReset}>
                Cancel
              </Button>
              <Button loading={loading} type='submit'>
                Submit
              </Button>
            </Group>
          </Box>
        </ScrollArea.Autosize>
        {isNewTagOpen && <NewTagModal setIsNewTagOpen={setIsNewTagOpen} isNewTagOpen={isNewTagOpen} />}
      </Modal>
    </>
  )
}

export default CreateNewModal
