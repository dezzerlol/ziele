import { Anchor, Box, Button, Center, Checkbox, Container, Image, Stack, Text, TextInput, Title } from '@mantine/core'
import Link from 'next/link'
import fetcher from '../../lib/fetcher'

const RegisterPage = () => {
  const handleRegister = () => {
    return fetcher('/auth/signup', { email: 'testinLogin@mail.com', password: '123456', username: 'testinLogin' })
  }

  return (
    <Container fluid p='0' sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Center sx={{ width: '50%', height: '100%', backgroundColor: 'lightblue' }}>
        <Image src='/sign-in-picture.svg' width='65%' alt='sign in picture' />
      </Center>
      <Center sx={{ width: '50%' }}>
        <Stack align='center' px='md' sx={{ maxWidth: '300px', width: '100%' }}>
          <Box sx={{ alignSelf: 'flex-start' }}>
            <Title mb='xs'>Create</Title>
            <Text>your account.</Text>
          </Box>
          <TextInput placeholder='Enter email...' sx={{ width: '100%' }} />
          <TextInput placeholder='Enter username...' sx={{ width: '100%' }} />
          <TextInput placeholder='Enter password...' sx={{ width: '100%' }} />
          <Checkbox label='Remember me' sx={{ alignSelf: 'flex-start' }} />
          <Button sx={{ width: '100%' }}>Submit</Button>
          <Link href='/login'>
            <Anchor sx={{ alignSelf: 'flex-start' }}>Already a user? Log in.</Anchor>
          </Link>
        </Stack>
      </Center>
    </Container>
  )
}

export default RegisterPage
