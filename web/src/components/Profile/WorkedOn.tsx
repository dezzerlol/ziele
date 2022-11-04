import { Anchor, Box, Card, Group, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { RiCheckboxFill } from 'react-icons/ri'


const WorkedOn = () => {
  return (
    <Box>
      <Group position='apart'>
        <Title order={5} color='gray.7'>
          Worked on
        </Title>
        <Link href='/' passHref>
          <Anchor>View all</Anchor>
        </Link>
      </Group>
      <Card shadow='xs' radius={5} withBorder>
        <Group
          p='xs'
          sx={{
            borderRadius: '5px',
            cursor: 'pointer',
            transition: '0.2s all',
            '&:hover': { backgroundColor: '#F5F7FB' },
          }}>
          <RiCheckboxFill size={24} />
          <Box>
            <Text>Task 1</Text>
            <Text size='xs' color='gray.6'>
              Test · You created this on 26 Oct. 2022
            </Text>
          </Box>
        </Group>
        <Text size='xs' color='gray.6' pt='md'>
          View all
        </Text>
      </Card>
    </Box>
  )
}

export default WorkedOn
