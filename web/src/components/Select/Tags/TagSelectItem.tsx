import Tag from '@components/Common/Tag'
import { Box } from '@mantine/core'
import { forwardRef } from 'react'

// eslint-disable-next-line react/display-name
const TagSelectItem = forwardRef(({ label, value, icon, color, ...others }: any, ref: any) => {
  return (
    <Box ref={ref} {...others} sx={{ cursor: 'pointer' }}>
      <Tag color={color} text={label} pointer />
    </Box>
  )
})

export default TagSelectItem
