import { createGetInitialProps } from '@mantine/next'
import Document, { Head, Html, Main, NextScript } from 'next/document'

const getInitialProps = createGetInitialProps()

export default class _Document extends Document {
  static getInitialProps = getInitialProps

  render() {
    return (
      <Html>
        <Head />
        <link rel='preload' href='/fonts/Nunito-Bold.ttf' as='font' crossOrigin='' type='font/ttf' />
        <link rel='preload' href='/fonts/Nunito-Regular.ttf' as='font' crossOrigin='' type='font/ttf' />
        <link rel='preload' href='/fonts/Nunito-Semibold.ttf' as='font' crossOrigin='' type='font/ttf' />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
