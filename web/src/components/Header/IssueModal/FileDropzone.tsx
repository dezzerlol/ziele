import { Group, Text, useMantineTheme } from '@mantine/core'
import { BiUpload, BiFile, BiX } from 'react-icons/bi'
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import Label from './Label'

export function FileDropzone(props: Partial<DropzoneProps>) {
  const theme = useMantineTheme()
  return (
    <>
      <Label text='Attachments' />
      <Dropzone
        onDrop={(files) => console.log('accepted files', files)}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        {...props}>
        <Group position='center' spacing='xl' style={{ minHeight: 80, pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <BiUpload size={50} color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <BiX size={50} color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <BiFile size={50} />
          </Dropzone.Idle>

          <div>
            <Text size='xl' inline>
              Drag files here or click to select files
            </Text>
            <Text size='sm' color='dimmed' inline mt={7}>
              Attach as many files as you like, each file should not exceed 10mb
            </Text>
          </div>
        </Group>
      </Dropzone>
    </>
  )
}
