import { Box, Button, CloseButton, Divider, Group, Modal, MultiSelect, Select, TextInput, Title } from '@mantine/core'
import dynamic from 'next/dynamic'
import { forwardRef, useState } from 'react'
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'
import { FiPlus } from 'react-icons/fi'
import { RiUser3Line } from 'react-icons/ri'
import { useUiStore } from 'store/uiStore'
import { FileDropzone } from './FileDropzone'
import Label from './Label'

const DescriptionEditor = dynamic(() => import('./DescriptionEditor'), { ssr: false, loading: () => null })

const issueTypes = [
  { label: 'Bug', value: 'bug' },
  { label: 'Task', value: 'task' },
  { label: 'Story', value: 'story' },
]

const assignees = [
  { label: 'User 1', value: 'user1', icon: <RiUser3Line /> },
  { label: 'User 2', value: 'user2', icon: <RiUser3Line /> },
  { label: 'User 3', value: 'user3', icon: <RiUser3Line /> },
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
function Value({ value, label, onRemove, classNames, icon, ...others }: any) {
  return (
    <div {...others}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          cursor: 'default',
          alignItems: 'center',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[4]}`,
          paddingLeft: 10,
          borderRadius: 4,
        })}>
        <Box mr={10}>{icon}</Box>
        <Box sx={{ lineHeight: 1, fontSize: 12 }}>{label}</Box>
        <CloseButton onMouseDown={onRemove} variant='transparent' size={22} iconSize={14} tabIndex={-1} />
      </Box>
    </div>
  )
}

// eslint-disable-next-line react/display-name
const Item = forwardRef(({ label, value, icon, ...others }: any, ref: any) => {
  return (
    <div ref={ref} {...others}>
      <Group spacing='xs' align='center'>
        <Box mr={10}>{icon}</Box>
        <Box sx={{ lineHeight: '14px' }}>{label}</Box>
      </Group>
    </div>
  )
})

const CreateIssueButton = () => {
  const { isCreateIssueModalOpen, toggleCreateIssueModal } = useUiStore((state) => ({
    isCreateIssueModalOpen: state.isCreateIssueModalOpen,
    toggleCreateIssueModal: state.toggleCreateIssueModal,
  }))
  
  return (
    <>
      <Button radius='lg' size='xs' sx={{ width: '80px' }} onClick={() => toggleCreateIssueModal(true)}>
        <FiPlus size={18} />
        <Box ml='xs'>Add</Box>
      </Button>

      <Modal
        opened={isCreateIssueModalOpen}
        withCloseButton={false}
        onClose={() => toggleCreateIssueModal(false)}
        size='xl'
        padding={30}
        title={<Title order={4}>Create issue</Title>}>
        <Box pb='xl'>
          <Select label={<Label text='Issue type' />} data={issueTypes} defaultValue='task' />
        </Box>
        <Divider />
        <Box pt='xl'>
          <TextInput label={<Label text='Short summary' />} />
        </Box>
        <Box pt='xl'>
          <DescriptionEditor />
        </Box>
        <Box pt='xl'>
          <MultiSelect
            valueComponent={Value}
            itemComponent={Item}
            label={<Label text='Assignees' />}
            data={assignees}
          />
        </Box>
        <Box pt='xl'>
          <MultiSelect label={<Label text='Tags' />} data={tags} />
        </Box>
        <Box pt='xl'>
          <Select itemComponent={Item} label={<Label text='Priority' />} data={priority} />
        </Box>
        <Box pt='xl'>
          <FileDropzone />
        </Box>
        <Group pt={40} position='right'>
          <Button variant='white' onClick={() => toggleCreateIssueModal(false)}>
            Cancel
          </Button>
          <Button>Submit</Button>
        </Group>
      </Modal>
    </>
  )
}

export default CreateIssueButton
