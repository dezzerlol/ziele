import { Badge } from '@mantine/core'
import React from 'react'

const Tag = ({ text, color, pointer }: { text: string; color: string; pointer?: boolean }) => {
  return (
    <Badge color={color} radius='sm' sx={{ cursor: pointer ? 'pointer' : undefined }}>
      {text}
    </Badge>
  )
}

export default Tag
