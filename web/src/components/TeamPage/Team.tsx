import Header from '@components/Header/Header'
import { Box } from '@mantine/core'
import React from 'react'

const Team = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box p='md'>
        <Header />
      </Box>
      <Box p='md'>team page</Box>
    </Box>
  )
}

export default Team
