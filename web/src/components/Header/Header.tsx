import { ActionIcon, Anchor, Avatar, Breadcrumbs, Group } from '@mantine/core'
import { useRouter } from 'next/router'
import { BiNotification } from 'react-icons/bi'
import { ProjectType } from 'types/ziele'
import CreateCardButton from './IssueModal/CreateIssueButton'

const Header = ({ project }: { project: ProjectType }) => {
  const router = useRouter()

  const { teamTitle, projectId } = router.query

  const items = project
    ? [
        { title: teamTitle, href: `/team/${teamTitle}` },
        { title: project.title, href: `/team/${teamTitle}/project/${projectId}` },
      ].map((item, index) => (
        <Anchor href={item.href} key={index}>
          {item.title}
        </Anchor>
      ))
    : []

  return (
    <Group align='center' position='apart'>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Group>
        <CreateCardButton />
        <Group>
          <ActionIcon>
            <BiNotification size={20} />
          </ActionIcon>
          <ActionIcon>
            <Avatar radius='lg' />
          </ActionIcon>
        </Group>
      </Group>
    </Group>
  )
}

export default Header
