import { Text } from '@mantine/core'

const Label = ({ text }: { text: React.ReactNode }) => {
  return (
    <Text color='gray.6' weight='bold' size='sm'>
      {text}
    </Text>
  )
}

export default Label
