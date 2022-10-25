import { gql, useQuery } from '@apollo/client'
import AvatarName from '@components/common/AvatarName'
import { Group, Menu } from '@mantine/core'
import { useRouter } from 'next/router'
import { RiArrowUpDownFill } from 'react-icons/ri'

const getTeams = gql`
  query getUserTeams {
    getUserTeams {
      id
      title
      image
    }
  }
`


const Header = () => {
  const { data } = useQuery(getTeams)
  const router = useRouter()
  let teams = data?.getUserTeams

  let currentTeam: any = teams?.find((team: any) => team.title === router.query.teamTitle)
  let otherTeams: any = teams?.filter((team: any) => team.title !== router.query.teamTitle)
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
