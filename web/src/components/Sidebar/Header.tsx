import AvatarName from '@components/Common/AvatarName'
import { Group, Menu } from '@mantine/core'
import useAccount from 'graphql/queries/useAccount'
import { useRouter } from 'next/router'
import { RiArrowUpDownFill } from 'react-icons/ri'
import { TeamType } from 'types/ziele'

const Header = ({ currentTeam, otherTeams }: { currentTeam: TeamType; otherTeams: TeamType[] }) => {
  const router = useRouter()

  return (
    <>
      <Menu width={260} shadow='xl'>
        <Menu.Target>
          <Group position='apart' sx={{ cursor: 'pointer' }}>
            <AvatarName image={currentTeam?.image} name={currentTeam?.title} undername={'Team plan'} type='default' />
            <RiArrowUpDownFill color='gray' />
          </Group>
        </Menu.Target>

        <Menu.Dropdown ml='md'>
          {otherTeams?.map((team: any) => (
            <Menu.Item key={team.id} onClick={() => router.push(`/team/${team.title}`)}>
              <AvatarName image={team.image} name={team.title} type='dropdown' />
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </>
  )
}

export default Header
