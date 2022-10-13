import { Box, Button, ScrollArea, Text } from '@mantine/core'
import React from 'react'
import { BiHash } from 'react-icons/bi'
import { BsPlusSquare } from 'react-icons/bs'

const Projects = ({ projects }: { projects: any }) => {
  return (
    <Box sx={{ maxHeight: '350px' }}>
      <Text size='sm' ml='xs' color='gray.6'>
        Projects
      </Text>
      <ScrollArea.Autosize maxHeight={350}>
        {projects.map((project: any) => (
          <Box
            key={project.id}
            p='xs'
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '10px',
              cursor: 'pointer',
              color: 'gray.',
              '&:hover': { backgroundColor: '#F5F7FB', color: '#562BF7' },
            }}>
            <BiHash /> <Text color='gray.8'>{project.title}</Text>
          </Box>
        ))}
      </ScrollArea.Autosize>
      <Button variant='white' p={'xs'} color='gray.6'>
        <BsPlusSquare />
        <Text ml='xs'>Add New Project</Text>
      </Button>
    </Box>
  )
}

export default Projects
