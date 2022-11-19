import { Avatar, Box, Card, Group, Text, Title } from '@mantine/core'
import { TeamType } from 'types/ziele'

const WorkTeams = ({ teams }: { teams: TeamType[] }) => {
  return (
    <Box>
      <Title order={5} color='gray.7'>
        Places you work in
      </Title>
      {teams &&
        teams.map((team) => (
          <Card key={team.id} shadow='xs' radius={5} withBorder mb='md'>
            <Group
              p={5}
              sx={{
                borderRadius: '5px',
                cursor: 'pointer',
                transition: '0.2s all',
                '&:hover': { backgroundColor: '#F5F7FB' },
              }}>
              <Group spacing='xs'>
                <Avatar src={team.image} />
                <Text weight={700}>{team.title}</Text>
              </Group>
            </Group>
          </Card>
        ))}
    </Box>
  )
}

export default WorkTeams
