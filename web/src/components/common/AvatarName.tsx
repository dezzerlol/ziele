import { Avatar, Box, Group, Text, Title } from '@mantine/core'
import React from 'react'
import { TbGripVertical } from 'react-icons/tb'

const AvatarName = ({
  name,
  image,
  type,
  members,
  undername,
}: {
  name: string
  image: string
  type: 'default' | 'dropdown'
  members?: string
  undername: string
}) => {
  return (
    <Group spacing='xs'>
      {type === 'dropdown' && <TbGripVertical />}
      <Avatar radius='md' size='sm' src={image} />
      <Box>
        <Title order={6} weight='bold' p={0}>
          {name}
        </Title>
        <Text size='xs'>{undername}</Text>
      </Box>
    </Group>
  )
}

export default AvatarName
