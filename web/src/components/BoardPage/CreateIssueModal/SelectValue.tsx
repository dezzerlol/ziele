import { Box, CloseButton } from '@mantine/core'

function SelectValue({ value, label, onRemove, classNames, icon, ...others }: any) {
  return (
    <div {...others}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          cursor: 'default',
          alignItems: 'center',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[4]}`,
          paddingLeft: 10,
          borderRadius: 4,
        })}>
        <Box mr={10}>{icon}</Box>
        <Box sx={{ lineHeight: 1, fontSize: 12 }}>{label}</Box>
        <CloseButton onMouseDown={onRemove} variant='transparent' size={22} iconSize={14} tabIndex={-1} />
      </Box>
    </div>
  )
}

export default SelectValue
