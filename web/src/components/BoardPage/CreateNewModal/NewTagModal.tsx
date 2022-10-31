import { gql, useMutation } from '@apollo/client'
import Tag from '@components/Common/Tag'
import { DEFAULT_THEME, Button, ColorPicker, Group, Modal, TextInput, Title, Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Label from './Label'

const createTag = gql`
  mutation createCardTag($data: CreateTagDto!) {
    createCardTag(data: $data) {
      status
      message
    }
  }
`
const colorsObjects = [
  { label: 'dark', value: DEFAULT_THEME.colors.dark[5] },
  { label: 'gray', value: DEFAULT_THEME.colors.gray[5] },
  { label: 'red', value: DEFAULT_THEME.colors.red[5] },
  { label: 'pink', value: DEFAULT_THEME.colors.pink[5] },
  { label: 'grape', value: DEFAULT_THEME.colors.grape[5] },
  { label: 'violet', value: DEFAULT_THEME.colors.violet[5] },
  { label: 'indigo', value: DEFAULT_THEME.colors.indigo[5] },
  { label: 'blue', value: DEFAULT_THEME.colors.blue[5] },
  { label: 'cyan', value: DEFAULT_THEME.colors.cyan[5] },
  { label: 'teal', value: DEFAULT_THEME.colors.teal[5] },
  { label: 'green', value: DEFAULT_THEME.colors.green[5] },
  { label: 'lime', value: DEFAULT_THEME.colors.lime[5] },
  { label: 'yellow', value: DEFAULT_THEME.colors.yellow[5] },
  { label: 'orange', value: DEFAULT_THEME.colors.orange[5] },
]

function getLabelFromColor(color: string) {
  return colorsObjects.find((item) => item.value === color)!.label
}

// TODO: migrate to form from hooks
const NewTagModal = ({ isNewTagOpen, setIsNewTagOpen }: any) => {
  const router = useRouter()
  const [tagBody, setTagBody] = useState('')
  const [tagColor, setTagColor] = useState('')
  const [mutate, { loading }] = useMutation(createTag, {
    refetchQueries: ['getProject'],
    awaitRefetchQueries: true,
    onCompleted: () => {
      showNotification({
        title: 'Tag created',
        message: 'Tag has been created successfully',
        color: 'green',
      })
    },
  })
  const colors = colorsObjects.map((item) => item.value)
  const projectId = router.query.projectId

  const handleCreate = async () => {
    await mutate({ variables: { data: { projectId: projectId, body: tagBody, color: tagColor } } })
    setTagBody('')
    setTagColor('')
    setIsNewTagOpen(false)
  }

  return (
    <Modal
      opened={isNewTagOpen}
      onClose={() => setIsNewTagOpen(false)}
      centered
      title={<Title order={4}>Create new tag</Title>}>
      <TextInput
        label={<Label text='Tag body' />}
        required
        onChange={(e) => setTagBody(e.currentTarget.value)}
        styles={{ label: { display: 'flex', gap: '2px' } }}
        placeholder='Tag body. Max 8 characters.'
        pb='xl'
      />
      <Group spacing={1}>
        <Label text='Tag color' />
        <Text color='red'>*</Text>
      </Group>
      <ColorPicker
        onChange={(e) => setTagColor(getLabelFromColor(e))}
        withPicker={false}
        swatches={colors}
        swatchesPerRow={14}
        fullWidth
        pb='xl'
      />
      {tagBody && <Tag text={tagBody} color={tagColor ? tagColor : 'dark'} />}
      <Group position='right'>
        <Button onClick={handleCreate} loading={loading}>
          Create
        </Button>
      </Group>
    </Modal>
  )
}

export default NewTagModal
