import { Box, Button, ScrollArea, Text } from '@mantine/core'
import { BsPlusSquare } from 'react-icons/bs'
import { ProjectType } from 'types/ziele'
import SidebarLink from './SidebarLink'

const Projects = ({ projects }: { projects: ProjectType[] }) => {

  return (
    <Box sx={{ maxHeight: '350px' }}>
      <Text size='sm' ml='xs' color='gray.6'>
        Projects
      </Text>
      <ScrollArea.Autosize maxHeight={350}>
        {projects?.map((project) => (
          <SidebarLink
            variant='projects'
            key={project.id}
            href={`/team/${project.team.title}/project/${project.id}`}
            title={project.title}
          />
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
