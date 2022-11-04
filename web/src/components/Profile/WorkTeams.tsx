import { Avatar, Box, Card, Group, Text, Title } from '@mantine/core'
import React from 'react'

const WorkTeams = () => {
  return (
    <Box>
      <Title order={5} color='gray.7'>
        Places you work in
      </Title>
      <Card shadow='xs' radius={5} withBorder>
        <Group
          p='xs'
          sx={{
            borderRadius: '5px',
            cursor: 'pointer',
            transition: '0.2s all',
            '&:hover': { backgroundColor: '#F5F7FB' },
          }}>
          <Group spacing='xs'>
            <Avatar />
            <Text weight={700}>Team Name</Text>
          </Group>
        </Group>
        <Text size='xs' color='gray.6' pt='md'>
          View all
        </Text>
      </Card>
    </Box>
  )
}

export default WorkTeams
