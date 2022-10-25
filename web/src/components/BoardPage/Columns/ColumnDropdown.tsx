import { gql, useMutation } from '@apollo/client'
import { ActionIcon, Box, Group, Loader, Menu } from '@mantine/core'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BiDotsHorizontalRounded, BiListUl, BiTrash } from 'react-icons/bi'

const Mutation = gql`
  mutation deleteColumn($columnId: String!, $projectId: String!) {
    deleteColumn(columnId: $columnId, projectId: $projectId) {
      status
      message
    }
  }
`

const ColumnDropdown = ({ id }: { id: string }) => {
  const router = useRouter()
  const [mutate, { data, loading, error }] = useMutation(Mutation, {
    onError: (error) => {},
    onCompleted: () => {},
    refetchQueries: ['getProjectColumns'],
    awaitRefetchQueries: true,
  })
  const [isClicked, setIsClicked] = useState(false)

  const handleDelete = () => {
    mutate({ variables: { columnId: id, projectId: router.query.projectId } })
  }

  return (
    <Menu opened={isClicked} onChange={() => setIsClicked(!isClicked)} position='bottom-end' shadow='sm'>
      <Menu.Target>
        <ActionIcon
          variant='transparent'
          sx={{
            color: isClicked ? '#562BF7' : '',
          }}>
          {!loading ? <BiDotsHorizontalRounded size={24} /> : <Loader size='xs' />}
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={handleDelete}>
          <Group spacing='xs' align='center'>
            <BiTrash size={16} />
            <Box mt={4}>Delete</Box>
          </Group>
        </Menu.Item>
        <Menu.Item>
          <Group spacing='xs' align='center'>
            <BiListUl size={16} />
            <Box mt={4}>Add limit</Box>
          </Group>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default ColumnDropdown
