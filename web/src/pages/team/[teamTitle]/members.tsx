import PageLayout from '@components/Layouts/PageLayout'
import Members from '@components/TeamPage/Members'
import { Box } from '@mantine/core'
import { useRouter } from 'next/router'

const TeamPage = () => {
  return (
    <PageLayout>
      <Members />
    </PageLayout>
  )
}

TeamPage.layout = true

export default TeamPage

export const getServerSideProps = async (context: any) => {
  const { teamTitle } = context.query

  if (!teamTitle) {
    return null
  }

  return {
    props: {},
  }
}
