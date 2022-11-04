import Tag from '@components/Common/Tag'
import { Button, ColorPicker, Group, Modal, Text, TextInput } from '@mantine/core'
import { tagColors } from 'constant/tagColors'
import useCreateTag from 'graphql/mutations/useCreateTag'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Label from '../../Common/Label'

function getLabelFromColor(color: string) {
  return tagColors.find((item) => item.value === color)!.label
}

// TODO: migrate to form from hooks
const NewTagModal = ({ isNewTagOpen, setIsNewTagOpen }: any) => {
  const router = useRouter()
  const [tagBody, setTagBody] = useState('')
  const [tagColor, setTagColor] = useState('')
  const { mutate, loading } = useCreateTag()
  
  const colors = tagColors.map((item) => item.value)
  const projectId = router.query.projectId

  const handleCreate = async () => {
    await mutate({ variables: { data: { projectId: projectId, body: tagBody, color: tagColor } } })
    setTagBody('')
    setTagColor('')
    setIsNewTagOpen(false)
  }

  return (
    <Modal opened={isNewTagOpen} onClose={() => setIsNewTagOpen(false)} centered title='Create new tag'>
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
