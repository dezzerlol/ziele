import { gql, useMutation } from '@apollo/client'
import { Button, Tooltip } from '@mantine/core'
import React from 'react'
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
  const [mutate, { data, loading, error }] = useMutation(Mutation)

  const handleCreate = () => {
    mutate({ variables: { data: { title: 'New Column', projectId: id } } })
  }

  return (
    <Tooltip label='Create new column'>
      <Button
        onClick={handleCreate}
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
    </Tooltip>
  )
}

export default CreateColumnButton
