import { Box, Button, Divider, Group, Modal, MultiSelect, ScrollArea, Select, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import dynamic from 'next/dynamic'
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'
import { RiUser3Line, RiAlertFill, RiCheckboxFill, RiBookmarkFill } from 'react-icons/ri'
import { useUiStore } from 'store/uiStore'
import { ColumnType, ProjectType } from 'types/ziele'
import { FileDropzone } from './FileDropzone'
import Label from './Label'
import SelectItem from './SelectItem'
import SelectValue from './SelectValue'

const DescriptionEditor = dynamic(() => import('./DescriptionEditor'), { ssr: false, loading: () => null })

const issueTypes = [
  { label: 'Bug', value: 'bug', icon: <RiAlertFill size={18} color='#E44D42' /> },
  { label: 'Task', value: 'task', icon: <RiCheckboxFill size={18} color='#4FADE6' /> },
  { label: 'Story', value: 'story', icon: <RiBookmarkFill size={18} color='#65BA43' /> },
]

const tags = [
  { label: 'UI', value: 'ui' },
  { label: 'Api', value: 'api' },
  { label: 'Web', value: 'web' },
]

const priority = [
  { label: 'Highest', value: 'highest', icon: <BiUpArrowAlt size={18} /> },
  { label: 'High', value: 'high', icon: <BiUpArrowAlt size={18} /> },
  { label: 'Low', value: 'low', icon: <BiDownArrowAlt size={18} /> },
  { label: 'Lowest', value: 'lowest', icon: <BiDownArrowAlt size={18} /> },
]

const CreateIssueModal = ({ columns, project }: { columns: ColumnType[]; project: ProjectType }) => {
  const form = useForm({
    initialValues: {
      issueType: 'task',
      columnId: '',
      shortSummary: '',
      description: '',
      assignees: [],
      tags: [],
      priority: '',
      files: '',
    },
  })
  const { isCreateIssueModalOpen, toggleCreateIssueModal } = useUiStore((state) => ({
    isCreateIssueModalOpen: state.isCreateIssueModalOpen,
    toggleCreateIssueModal: state.toggleCreateIssueModal,
  }))

  const formattedColumns = columns.map((column) => ({ value: column.id, label: column.title }))
  const users = project.users.map((user: any) => ({ value: user.id, label: user.username, icon: <RiUser3Line /> }))

  return (
    <>
      <Modal
        opened={isCreateIssueModalOpen}
        withCloseButton={false}
        onClose={() => toggleCreateIssueModal(false)}
        size='xl'
        padding={20}
        title={<Title order={4}>Create issue</Title>}>
        <ScrollArea.Autosize maxHeight='700px' offsetScrollbars={true} type='auto'>
          <Box p='sm' component='form' onSubmit={form.onSubmit((values) => console.log(values))}>
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
                {...form.getInputProps('shortSummary')}
                required
                styles={{ label: { display: 'flex', gap: '2px' } }}
              />
            </Box>
            <Box pt='xl'>
              <DescriptionEditor />
            </Box>
            <Box pt='xl'>
              <MultiSelect
                valueComponent={SelectValue}
                itemComponent={SelectItem}
                label={<Label text='Assignees' />}
                data={users}
                {...form.getInputProps('assignees')}
              />
            </Box>
            <Box pt='xl'>
              <MultiSelect label={<Label text='Tags' />} data={tags} {...form.getInputProps('tags')} />
            </Box>
            <Box pt='xl'>
              <Select
                itemComponent={SelectItem}
                label={<Label text='Priority' />}
                data={priority}
                {...form.getInputProps('priority')}
              />
            </Box>
            <Box pt='xl'>
              <FileDropzone />
            </Box>
            <Group pt={40} position='right'>
              <Button
                variant='white'
                onClick={() => {
                  form.reset()
                  toggleCreateIssueModal(false)
                }}>
                Cancel
              </Button>
              <Button type='submit'>Submit</Button>
            </Group>
          </Box>
        </ScrollArea.Autosize>
      </Modal>
    </>
  )
}

export default CreateIssueModal
