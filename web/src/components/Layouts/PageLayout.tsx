import Header from '@components/Header/Header'
import { Box, ScrollArea } from '@mantine/core'
import React from 'react'

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollArea>
        <Box px='md' pt='md'>
          <Header />
        </Box>
        <Box px='md' pt='md' sx={{ height: 'calc(100vh - 44px)' }}>
          {children}
        </Box>
      </ScrollArea>
    </Box>
  )
}

export default PageLayout
