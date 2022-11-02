import { Avatar, Box, Group, Skeleton, Stack, Text, Title } from '@mantine/core'
import React from 'react'
import { TbGripVertical } from 'react-icons/tb'

interface Props {
  name: string
  image: string | null
  type: 'default' | 'dropdown'
  undername?: string
}

const AvatarName = ({ name, image, type, undername }: Props) => {
  return (
    <Group spacing='xs'>
      {type === 'dropdown' && <TbGripVertical />}
      {name ? (
        <>
          <Avatar radius='md' size='sm' src={image} />
          <Box>
            <Title order={6} weight='bold' p={0}>
              {name}
            </Title>
            {undername && <Text size='xs'>{undername}</Text>}
          </Box>
        </>
      ) : (
        <>
          <Skeleton width='26px' height='26px' radius='md' />
          <Stack spacing={3}>
            <Skeleton width='100px' height='20.6px' />
            <Skeleton width='50px' height='16px' />
          </Stack>
        </>
      )}
    </Group>
  )
}

export default AvatarName
