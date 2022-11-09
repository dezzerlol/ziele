import Tag from '@components/Common/Tag'
import { Avatar, Box, Card, Group, Text, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import { forwardRef, useState } from 'react'
import DotsButton from './DotsButton'

const IssueCard = forwardRef(({ card, style, ...props }: any, ref) => {
  const router = useRouter()
  const [isHover, setIsHover] = useState(false)

  const handleOpen = () => {
    // shallow to prevent nextjs router call
    router.push(`${router.asPath}?issue=${card.id}`, undefined, { shallow: true })
  }

  return (
    <Card
      my='md'
      ref={ref}
      {...props}
      shadow='xs'
      onClick={handleOpen}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      sx={{
        ...style,
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': { backgroundColor: '#F4F5F7' },
        overflow: 'visible',
      }}>
      <Group position='apart' sx={{ height: '28px' }}>
        <Title order={5}>{card.title}</Title>
        <DotsButton cardId={card.id} isHover={isHover} />
      </Group>
      <Text color='gray.6'>Short summary</Text>
      <Group mt='xl' position='apart'>
        <Group spacing='xs'>
          {card.tags.length > 0 ? (
            card.tags.map((tag: any) => <Tag key={tag.body} color={tag.color} text={tag.body} />)
          ) : (
            <Box />
          )}
        </Group>
        <Box>
          <Avatar radius='xl' size='sm' />
        </Box>
      </Group>
    </Card>
  )
})

IssueCard.displayName = 'IssueCard'

export default IssueCard
