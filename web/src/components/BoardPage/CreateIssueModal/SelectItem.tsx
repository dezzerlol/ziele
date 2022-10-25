import { Box, Group } from '@mantine/core'
import { forwardRef } from 'react'

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef(({ label, value, icon, ...others }: any, ref: any) => {
  return (
    <div ref={ref} {...others}>
      <Group spacing='xs' align='center'>
        {icon && (
          <Box mr={2} mt={5}>
            {icon}
          </Box>
        )}
        <Box>{label}</Box>
      </Group>
    </div>
  )
})

export default SelectItem
