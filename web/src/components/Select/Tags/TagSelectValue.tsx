import Tag from '@components/Common/Tag'
import { CloseButton, Group } from '@mantine/core'

function TagSelectValue({ value, label, onRemove, classNames, color, ...others }: any) {
  return (
    <div {...others}>
      <Group spacing={1}>
        <Tag color={color} text={value} pointer />
        <CloseButton onMouseDown={onRemove} variant='transparent' size={22} iconSize={14} tabIndex={-1} />
      </Group>
    </div>
  )
}

export default TagSelectValue
