import { Box, Button, Divider, Group, Modal, MultiSelect, ScrollArea, Select, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import dynamic from 'next/dynamic'
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'
import { RiUser3Line, RiAlertFill, RiCheckboxFill, RiBookmarkFill } from 'react-icons/ri'
import { useUiStore } from 'store/uiStore'
import { ColumnType, ProjectType } from 'types/ziele'
import { FileDropzone } from './FileDropzone'
import Label from './Label'
import SelectItem from '../../Select/WithIcon/SelectItem'
import SelectValue from '../../Select/WithIcon/SelectValue'
import TagSelectItem from '@components/Select/Tags/TagSelectItem'
import TagSelectValue from '@components/Select/Tags/TagSelectValue'
import useCreateCard from 'graphql/mutations/useCreateCard'
import React, { useState } from 'react'
import NewTagModal from './NewTagModal'
const DescriptionEditor = dynamic(() => import('./DescriptionEditor'), { ssr: false, loading: () => null })

interface Props {
  columns: ColumnType[]
  project: ProjectType
}

const issueTypes = [
  { label: 'Bug', value: 'bug', icon: <RiAlertFill size={18} color='#E44D42' /> },
  { label: 'Task', value: 'task', icon: <RiCheckboxFill size={18} color='#4FADE6' /> },
  { label: 'Story', value: 'story', icon: <RiBookmarkFill size={18} color='#65BA43' /> },
]

const priority = [
  { label: 'Highest', value: 'highest', icon: <BiUpArrowAlt size={18} /> },
  { label: 'High', value: 'high', icon: <BiUpArrowAlt size={18} /> },
  { label: 'Low', value: 'low', icon: <BiDownArrowAlt size={18} /> },
  { label: 'Lowest', value: 'lowest', icon: <BiDownArrowAlt size={18} /> },
]

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
    await mutate({ variables: { data: form.values } })
    handleReset()
  }

  const formattedColumns = columns.map((column) => ({ value: column.id, label: column.title }))
  const users = project.users.map((user: any) => ({ value: user.id, label: user.username, icon: <RiUser3Line /> }))
  const tags = project.tags.map((tag) => ({ label: tag.body, value: tag.id, color: tag.color }))

  return (
    <>
      <Modal
        opened={isCreateModalOpen}
        withCloseButton={false}
        onClose={handleReset}
        size='xl'
        padding={20}
        title={<Title order={4}>Create issue</Title>}>
        <ScrollArea.Autosize maxHeight='700px' offsetScrollbars={true} type='auto'>
          <Box p='sm' component='form' onSubmit={handleSubmit}>
            <Box pb='xl'>
              <Select
                label={<Label text='Issue type' />}
                itemComponent={SelectItem}
                data={issueTypes}
                {...form.getInputProps('issueType')}
                icon={issueTypes.find((i) => i.value === form.values.issueType)?.icon}
              />
            </Box>
            <Box pb='xl'>
              <Select
                label={<Label text='Column' />}
                data={formattedColumns}
                itemComponent={SelectItem}
                {...form.getInputProps('columnId')}
                required
                styles={{ label: { display: 'flex', gap: '2px' } }}
              />
            </Box>
            <Divider />
            <Box pt='xl'>
              <TextInput
                label={<Label text='Short summary' />}
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
                label={<Label text='Assignees' />}
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
                label={<Label text='Tags' />}
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
                label={<Label text='Priority' />}
                data={priority}
                icon={priority.find((i) => i.value === form.values.priority)?.icon}
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
