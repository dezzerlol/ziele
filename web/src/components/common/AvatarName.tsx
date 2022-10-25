import { Avatar, Box, Group, Text, Title } from '@mantine/core'
import React from 'react'
import { TbGripVertical } from 'react-icons/tb'

const AvatarName = ({
  name,
  image,
  type,
  undername,
}: {
  name: string
  image: string
  type: 'default' | 'dropdown'
  undername?: string
}) => {
  return (
    <Group spacing='xs'>
      {type === 'dropdown' && <TbGripVertical />}
      <Avatar radius='md' size='sm' src={image} />
      <Box>
        <Title order={6} weight='bold' p={0}>
          {name}
        </Title>
        {undername && <Text size='xs'>{undername}</Text>}
      </Box>
    </Group>
  )
}

export default AvatarName
