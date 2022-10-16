import { Modal, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'

const IssueModal = () => {
  const theme = useMantineTheme()
  const router = useRouter()
  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={router.query.issue ? true : false}
      onClose={() => router.push(`/team/${router.query.teamId}/boards/${router.query.boardId}`)}>
      issue = {router.query.issue}
    </Modal>
  )
}

export default IssueModal
