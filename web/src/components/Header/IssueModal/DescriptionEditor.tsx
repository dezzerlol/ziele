import RichTextEditor from '@mantine/rte'
import { useState } from 'react'
import Label from './Label'

const initialValue = "<p>Describe the issue in as much detail as you'd like.</p>"

const DescriptionEditor = () => {
  const [value, onChange] = useState(initialValue)
  return (
    <>
      <Label text='Description' />
      <RichTextEditor value={value} onChange={onChange} id='rte' />
    </>
  )
}

export default DescriptionEditor
