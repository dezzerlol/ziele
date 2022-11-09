import { formatDate, getTimeAgo } from '@lib/formatDate'
import { Avatar, Box, Button, Divider, Group, Stack, Text, Textarea } from '@mantine/core'
import React from 'react'

const comments = [
  { id: 1, author: 'noob11', authorAvatar: '', body: 'Testing comments...', createdAt: '1667038184512' },
  { id: 2, author: 'Testuser', authorAvatar: '', body: 'Sup dudes', createdAt: '1667038084512' },
  { id: 3, author: 'Awesome14', authorAvatar: '', body: 'ong', createdAt: '1567038084512' },
  { id: 4, author: 'Wtf15', authorAvatar: '', body: 'poop', createdAt: '1365038084512' },
]

const CommentsPanel = () => {
  const handlePublish = () => {
    console.log('Publishing comment...')
  }
  return (
    <>
      <Textarea
        placeholder='Your comment'
        variant='filled'
        rightSection={
          <Button size='xs' mr={50} mt={20} onClick={handlePublish}>
            Publish
          </Button>
        }
      />
      <Divider my='md' color='var(--border-color)' />

      {comments.map((comment) => (
        <Stack key={comment.id} spacing='xs' mb='xl'>
          <Group>
            <Box>
              <Group spacing='xs'>
                <Avatar size='sm' radius='xl' src={comment.authorAvatar} />
                <Text weight={600}>{comment?.author}</Text>
                <Text color='gray' size='xs'>
                  {getTimeAgo(comment.createdAt)}
                </Text>
              </Group>
            </Box>
          </Group>
          <Text>{comment.body}</Text>
        </Stack>
      ))}
    </>
  )
}

export default CommentsPanel
