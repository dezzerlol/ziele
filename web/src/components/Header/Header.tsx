import { ActionIcon, Anchor, Avatar, Box, Breadcrumbs, Button, Group } from '@mantine/core'
import { useRouter } from 'next/router'
import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { BiNotification } from 'react-icons/bi'
import CreateCardButton from './IssueModal/CreateIssueButton'

const Header = () => {
  const router = useRouter()

  const items = [
    { title: router.query.teamId, href: `/team/${router.query.teamId}` },
    { title: router.query.boardId, href: `/team/${router.query.teamId}/boards/${router.query.boardId}` },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ))

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
