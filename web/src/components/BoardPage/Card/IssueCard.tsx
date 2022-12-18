import Tag from '@components/Common/Tag'
import { Avatar, Box, Card, Group, Text, Title } from '@mantine/core'
import { ISSUE_TYPES } from 'constant/issueTypes'
import { useRouter } from 'next/router'
import React, { forwardRef, useState } from 'react'
import DotsButton from './DotsButton'

const getIssueCardIcon = (type: string) => {
  const issueType = ISSUE_TYPES.find((issueType) => issueType.value === type)
  return issueType?.icon
}

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
        {isHover && <DotsButton cardId={card.id} />}
      </Group>

      <Group mt='xl' position='apart'>
        <Group spacing='xs'>
          {card.tags.length > 0 ? (
            card.tags.map((tag: any) => <Tag key={tag.body} color={tag.color} text={tag.body} />)
          ) : (
            <Box />
          )}
        </Group>
        {getIssueCardIcon(card.issueType)}
      </Group>
    </Card>
  )
})

IssueCard.displayName = 'IssueCard'

export default React.memo(IssueCard)
