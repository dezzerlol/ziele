import Sidebar from '@components/Sidebar/Sidebar'
import { Box, Container } from '@mantine/core'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container fluid p={0} sx={{ backgroundColor: '#F5F7FB', minHeight: '100vh', display: 'flex' }}>
      <Sidebar />
      <Box
        p='md'
        component='main'
        sx={{
          width: 'calc(100% - 260px)',
          overflowY: 'auto',
          maxHeight: '100vh',
          height: '100%',
          '@media (max-width: 755px)': {
            width: '100%',
          },
        }}>
        {children}
      </Box>
    </Container>
  )
}

export default Layout
