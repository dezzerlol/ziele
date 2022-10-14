import AvatarName from '@components/common/AvatarName'
import { Group, Menu } from '@mantine/core'
import { RiArrowUpDownFill } from 'react-icons/ri'

type Props = {
  companyName: string
  image: string
}

const Header = ({ companyName, image }: Props) => {
  let members = 4500
  return (
    <>
      <Menu width={260} shadow='xl'>
        <Menu.Target>
          <Group position='apart' sx={{ cursor: 'pointer' }}>
            <AvatarName image={image} name={companyName} undername={'Team plan'} type='default' />
            <RiArrowUpDownFill color='gray' />
          </Group>
        </Menu.Target>

        <Menu.Dropdown ml='md'>
          <Menu.Item>
            <AvatarName
              image={image}
              name={companyName}
              type='dropdown'
              undername={`Team plan • ${members} members`}
            />
          </Menu.Item>
          <Menu.Item>
            <AvatarName image={image} name={companyName} type='dropdown' undername={`Team plan • ${members} members`} />
          </Menu.Item>
          <Menu.Item>
            <AvatarName image={image} name={companyName} type='dropdown' undername={`Team plan • ${members} members`} />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}

export default Header
