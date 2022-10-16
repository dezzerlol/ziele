import { Button, Tooltip } from '@mantine/core'
import React from 'react'
import { FiPlus } from 'react-icons/fi'

const CreateColumnButton = () => {
  return (
    <Tooltip label='Create new column'>
      <Button
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
