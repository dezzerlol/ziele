import { gql, useQuery } from '@apollo/client'
import { Box, Button, ScrollArea, Text } from '@mantine/core'
import { useRouter } from 'next/router'
import { BsPlusSquare } from 'react-icons/bs'
import SidebarLink from './SidebarLink'

const getProjects = gql`
  query getUserProjects {
    getUserProjects {
      id
      title
      image
    }
  }
`

const Projects = () => {
  const router = useRouter()
  const { data } = useQuery(getProjects)

  let projects = data?.getUserProjects
  return (
    <Box sx={{ maxHeight: '350px' }}>
      <Text size='sm' ml='xs' color='gray.6'>
        Projects
      </Text>
      <ScrollArea.Autosize maxHeight={350}>
        {projects?.map((project: any) => (
          <SidebarLink
            variant='projects'
            key={project.id}
            href={`/team/${router.query.teamTitle}/project/${project.id}`}
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
