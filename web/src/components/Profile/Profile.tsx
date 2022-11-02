import Sidebar from '@components/Sidebar/Sidebar'
import { Anchor, Avatar, Box, Card, Container, Group, Stack, Text, TextInput, Title } from '@mantine/core'
import useAccount from 'graphql/queries/useAccount'
import Link from 'next/link'
import React from 'react'
import { BiBriefcaseAlt, BiBuilding, BiCurrentLocation, BiEnvelope } from 'react-icons/bi'
import { RiCheckboxFill } from 'react-icons/ri'

const Profile = () => {
  const { account, loading } = useAccount()
  console.log({ account })
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Box sx={{ minHeight: '15%', width: '100%', backgroundColor: 'gray' }}></Box>

      <Box p='md' sx={{ display: 'flex', gap: '30px', width: '80%' }}>
        <Box p='md' sx={{ flex: '0 0 320px', border: '1px solid lightgray', borderRadius: '5px', minWidth: '200px' }}>
          <Stack p='md' align='center'>
            <Box sx={{ marginTop: '-110px' }}>
              <Avatar src={account?.avatar} radius={100} size={150} />
            </Box>
            <Box>
              <Title order={2}>{account?.username}</Title>
            </Box>
          </Stack>
          <Stack pb='sm'>
            <Label text='About' />
            <Group spacing='xs'>
              <BiBriefcaseAlt size={20} />
              <TextInput placeholder='Your job title' variant='filled' sx={{ width: 'calc(100% - 36px)' }} />
            </Group>

            <Group spacing='xs'>
              <BiBuilding size={20} />
              <TextInput placeholder='Your organization' variant='filled' sx={{ width: 'calc(100% - 36px)' }} />
            </Group>

            <Group spacing='xs'>
              <BiCurrentLocation size={20} />
              <TextInput placeholder='Your location' variant='filled' sx={{ width: 'calc(100% - 36px)' }} />
            </Group>

            <Label text='Contact' />

            <Group spacing='xs'>
              <BiEnvelope size={20} />
              <TextInput
                value={account?.email}
                placeholder='Email'
                variant='filled'
                sx={{ width: 'calc(100% - 36px)' }}
              />
            </Group>
          </Stack>
        </Box>

        <Box sx={{ flex: '1 1 980px', minWidth: '240px' }}>
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
              <Group p='xs' sx={{ backgroundColor: 'lightgray', borderRadius: '5px' }}>
                <RiCheckboxFill size={24} />
                <Text>Task 1</Text>
              </Group>
              <Text size='xs' color='gray.6'>
                View all
              </Text>
            </Card>
          </Box>
          <Box>
            <Title order={5} color='gray.7'>
              Places you work in
            </Title>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const Label = ({ text }: { text: string }) => {
  return (
    <Text color='gray.7' weight={600} size='sm'>
      {text}
    </Text>
  )
}

export default Profile
