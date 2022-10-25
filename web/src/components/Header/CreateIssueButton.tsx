import { Box, Button } from '@mantine/core'
import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { useUiStore } from 'store/uiStore'

const CreateIssueButton = () => {
  const { isCreateIssueModalOpen, toggleCreateIssueModal } = useUiStore((state) => ({
    isCreateIssueModalOpen: state.isCreateIssueModalOpen,
    toggleCreateIssueModal: state.toggleCreateIssueModal,
  }))
  return (
    <Button radius='lg' size='xs' sx={{ width: '80px' }} onClick={() => toggleCreateIssueModal(true)}>
      <FiPlus size={18} />
      <Box ml='xs'>Add</Box>
    </Button>
  )
}

export default CreateIssueButton
