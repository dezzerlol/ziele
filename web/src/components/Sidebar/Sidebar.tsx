import { Box, TextInput } from '@mantine/core'
import { BiSearchAlt } from 'react-icons/bi'
import Header from './Header'

const Sidebar = () => {
  return (
    <Box p='md' sx={{ width: '260px', minHeight: '100vh', backgroundColor: 'white' }}>
      <Header
        companyName='My company'
        image='https://besthqwallpapers.com/Uploads/23-11-2020/146623/thumb2-mercedes-benz-logo-black-background-mercedes-emblem-mercedes-logo-on-a-black-background-car-brands.jpg'
      />
      <TextInput
        variant='filled'
        icon={<BiSearchAlt size={18} />}
        mt='lg'
        placeholder='Search'
        radius='md'
        styles={{ input: { border: '1px solid lightgray' } }}
      />
    </Box>
  )
}

export default Sidebar
