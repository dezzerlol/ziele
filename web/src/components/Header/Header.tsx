import { ActionIcon, Anchor, Avatar, Breadcrumbs, Group } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiNotification } from 'react-icons/bi'
import { ProjectType } from 'types/ziele'
import CreateIssueButton from './CreateIssueButton'
import Notifications from './Notifications'

const Header = ({ project }: { project?: ProjectType }) => {
  const router = useRouter()
  const { teamTitle, projectId } = router.query

  // breadcrumbs items
  const items = project ? (
    [
      { title: teamTitle, href: `/team/${teamTitle}` },
      { title: project.title, href: `/team/${teamTitle}/project/${projectId}` },
    ].map((item, index) => (
      <Link href={item.href} key={index} passHref>
        <Anchor>{item.title}</Anchor>
      </Link>
    ))
  ) : (
    <Link href={`/team/${teamTitle}`} passHref>
      <Anchor>{teamTitle}</Anchor>
    </Link>
  )

  return (
    <Group align='center' position='apart'>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Group>
        {projectId && <CreateIssueButton />}
        <Group>
          <Notifications />
        </Group>
      </Group>
    </Group>
  )
}

export default Header
