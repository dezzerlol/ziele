import { Anchor, Box, Button, Center, Container, Image, Stack, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import Link from 'next/link'
import { useState } from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import { AUTH_TOKEN } from '@constant'
import fetcher from '@lib/fetcher'
import { verifyJwt } from '@services/verifyJwt'
import SEO from '@components/SEO'

interface FormValues {
  email: string
  username: string
  password: string
}

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const signupForm = useForm<FormValues>({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 6 ? null : 'Password must be at least 6 characters'),
      username: (value) => (value.length >= 3 ? null : 'Username must be at least 3 characters'),
    },
  })

  const handleSignup = async (values: FormValues) => {
    setIsLoading(true)
    try {
      const data = await fetcher('/auth/signup', {
        email: values.email,
        password: values.password,
        username: values.username,
      })
      showNotification({
        title: 'Success',
        message: 'Account created!',
        color: 'green',
        icon: <BsCheckCircleFill />,
      })
    } catch (error: any) {
      signupForm.setFieldError('email', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <SEO title='Sign up' />
      <Container fluid p='0' sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Center sx={{ width: '50%', height: '100%', backgroundColor: 'lightblue' }}>
          <Image src='/scrum-board.svg' width='65%' alt='sign in picture' />
        </Center>
        <Center sx={{ width: '50%' }}>
          <Stack
            align='center'
            px='md'
            sx={{ maxWidth: '300px', width: '100%', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ alignSelf: 'flex-start' }}>
              <Title mb='sm'>Create</Title>
              <Text>your account.</Text>
            </Box>
            <Box
              component='form'
              onSubmit={signupForm.onSubmit((values) => handleSignup(values))}
              sx={{ width: '100%' }}>
              <TextInput
                pb='sm'
                {...signupForm.getInputProps('email')}
                placeholder='Enter email...'
                sx={{ width: '100%' }}
              />
              <TextInput
                pb='sm'
                {...signupForm.getInputProps('username')}
                placeholder='Enter username...'
                sx={{ width: '100%' }}
              />
              <TextInput
                type='password'
                pb='sm'
                {...signupForm.getInputProps('password')}
                placeholder='Enter password...'
                sx={{ width: '100%' }}
              />
              <Button type='submit' loading={isLoading} sx={{ width: '100%' }}>
                Submit
              </Button>
            </Box>
            <Link href='/login'>
              <Anchor sx={{ alignSelf: 'flex-start' }}>Already a user? Log in.</Anchor>
            </Link>
          </Stack>
        </Center>
      </Container>
    </>
  )
}

export default RegisterPage

export async function getServerSideProps(context: any) {
  const cookie = context.req.cookies[AUTH_TOKEN]

  console.log(cookie)

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
