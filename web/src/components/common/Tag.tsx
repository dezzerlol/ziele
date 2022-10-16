import { Badge } from '@mantine/core'
import React from 'react'

const Tag = ({ text, color }: { text: string; color: string }) => {
  return (
    <Badge color={color} radius='sm'>
      {text}
    </Badge>
  )
}

export default Tag
