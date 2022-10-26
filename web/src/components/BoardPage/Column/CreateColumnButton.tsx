import { gql, useMutation } from '@apollo/client'
import { Box, Button, Loader, TextInput, Tooltip } from '@mantine/core'
import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'

const Mutation = gql`
  mutation createColumn($data: CreateColumnDto!) {
    createColumn(data: $data) {
      id
      title
    }
  }
`

const CreateColumnButton = ({ id }: { id: string }) => {
  const [isInputOpen, setIsInputOpen] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const [mutate, { data, loading, error }] = useMutation(Mutation, {
    onError: (error) => {},
    onCompleted: () => {
      setIsInputOpen(false)
      setNewColumnTitle('')
    },
    refetchQueries: ['getProjectColumns'],
    awaitRefetchQueries: true,
  })

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    await mutate({ variables: { data: { title: newColumnTitle, projectId: id } } })
  }

  return (
    <Tooltip label='Create new column'>
      {!isInputOpen ? (
        <Button
          onClick={() => setIsInputOpen(true)}
          p='xs'
          variant='subtle'
          sx={{
            border: '1px dashed lightgrey',
            borderRadius: '5px',
            minWidth: '300px',
            maxWidth: '300px',
            width: '100%',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            color: '#868E96',
          }}>
          <FiPlus size={32} />
        </Button>
      ) : (
        <Box component='form' onSubmit={handleCreate} sx={{ height: '40px' }}>
          <TextInput
            onChange={(e) => setNewColumnTitle(e.currentTarget.value)}
            rightSection={loading && <Loader size='xs' />}
            error={error && error.message}
            placeholder='Enter column name...'
            sx={{
              borderRadius: '5px',
              minWidth: '300px',
              maxWidth: '300px',
              width: '100%',
              color: '#868E96',
            }}
          />
        </Box>
      )}
    </Tooltip>
  )
}

export default CreateColumnButton
