import Sidebar from '@components/Sidebar/Sidebar'
import { Box, Container, ScrollArea } from '@mantine/core'
import React from 'react'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container fluid p={0} sx={{ minHeight: '100vh', display: 'flex' }} id='layout'>
      <Sidebar />
      <Box
        component='main'
        sx={{
          width: 'calc(100% - 260px)',
          height: '100%',
          overflowY: 'hidden',
          '@media (max-width: 755px)': {
            width: '100%',
          },
        }}>
       {children}
      </Box>
    </Container>
  )
}

export default AppLayout
