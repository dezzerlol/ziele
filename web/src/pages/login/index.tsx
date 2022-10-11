import { Anchor, Box, Button, Center, Checkbox, Container, Image, Stack, Text, TextInput, Title } from '@mantine/core'
import Link from 'next/link'
import fetcher from '../../lib/fetcher'
import { useForm } from '@mantine/form'
import { verifyJwt } from '../../services/verifyJwt'
import { AUTH_TOKEN } from '../../constant'
import { useRouter } from 'next/router'

interface FormValues {
  email: string
  password: string
}

const LoginPage = () => {
  const router = useRouter()
  const loginForm = useForm<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const handleLogin = async (values: FormValues) => {
    try {
      const data = await fetcher('/auth/login', { email: values.email, password: values.password })
      router.replace('/')
    } catch (error: any) {
      loginForm.setFieldError('email', error.message)
    }
  }

  return (
    <Container fluid p='0' sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Center sx={{ width: '50%', height: '100%', backgroundColor: 'lightblue' }}>
        <Image src='/sign-in-picture.svg' width='65%' alt='sign in picture' />
      </Center>
      <Center sx={{ width: '50%' }}>
        <Stack align='center' px='md' sx={{ maxWidth: '300px', width: '100%', display: 'flex', alignItems: 'center' }}>
          <Box sx={{ alignSelf: 'flex-start' }}>
            <Title mb='sm'>Log in</Title>
            <Text>to your account.</Text>
          </Box>
          <Box component='form' onSubmit={loginForm.onSubmit((values) => handleLogin(values))} sx={{ width: '100%' }}>
            <TextInput
              pb='sm'
              {...loginForm.getInputProps('email')}
              placeholder='Enter email...'
              sx={{ width: '100%' }}
            />
            <TextInput
              type='password'
              pb='sm'
              {...loginForm.getInputProps('password')}
              placeholder='Enter password...'
              sx={{ width: '100%' }}
            />
            <Checkbox pb='sm' label='Remember me' sx={{ alignSelf: 'flex-start' }} />
            <Button type='submit' sx={{ width: '100%' }}>
              Log in
            </Button>
          </Box>
          <Link href='/register'>
            <Anchor sx={{ alignSelf: 'flex-start' }}>Dont have an account? Sign up.</Anchor>
          </Link>
        </Stack>
      </Center>
    </Container>
  )
}

export default LoginPage

export async function getServerSideProps(context: any) {
  const cookie = context.req.cookies[AUTH_TOKEN]

  if (cookie) {
    const session = await verifyJwt(cookie)
    if (session)
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
  }
  return {
    props: {},
  }
}
